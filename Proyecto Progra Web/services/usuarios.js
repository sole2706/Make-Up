const { PrismaClient } = require("@prisma/client")
const bcrypt = require ('bcrypt');
const crypto = require ('crypto');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

class Usuarios {

  constructor() {

  };


  async Agregar(Usuario) {
    let resultado;
    try {
      const hashedContrasena = await bcrypt.hash(Usuario.Contrasena, 10);
      resultado = await prisma.usuario.create({
        data: {
            NombreUsuario: Usuario.NombreUsuario,
            ApellidoUsuario: Usuario.ApellidoUsuario,
            Telefono: Usuario.Telefono,
            Correo: Usuario.Correo,
            Contrasena: hashedContrasena,
            
        }
      });
      let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se creo el usuario:` + Usuario.NombreUsuario,
        },
      });
      console.log(auditoria);
    } catch (error) {
      console.error(`No se pudo insertar la usuario ${Usuario} debido al error: ${error}`);
    }
    return resultado;
  };

  async Actualizar(UsuarioID, Usuario) {
    let resultado;
    try {
      const hashedContrasena = await bcrypt.hash(Usuario.Contrasena, 10);
      resultado = await prisma.usuario.update({
        where: { UsuarioID: parseInt(UsuarioID) },
        data: {
            NombreUsuario: Usuario.NombreUsuario,
            ApellidoUsuario: Usuario.ApellidoUsuario,
            Telefono: parseInt(Usuario.Telefono),
            Correo: Usuario.Correo,
            Contrasena: hashedContrasena,
        },
    });
    let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se modifico el usuario:` + Usuario.NombreUsuario,
        },
      });
      console.log(auditoria);
    
    } catch (error) {
      console.error(`No se pudo actualizar la usuario ${UsuarioID} debido al error: ${error}`);
    }
    return resultado;
  };

  async Borrar(usuarioId) {
    let resultado;
    try {
      resultado = await prisma.usuario.delete({
        where: {
          UsuarioID: parseInt(usuarioId),
        },
      });
      let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se borro el usuario:` + usuarioId,
        },
      });
      console.log(auditoria)
    } catch (error) {
      console.error(`No se pudo borrar la usuario ${usuarioId} debido al error: ${error}`);
    }
    return resultado;
  };

  Listar(UsuarioID) {
    let usuarios;
    if (UsuarioID === undefined) {
      usuarios = prisma.usuario.findMany();
    } else {
      usuarios = prisma.usuario.findMany({
        where: {
          UsuarioID: parseInt(UsuarioID),
        },
      });
    }
    return usuarios;
  };
  PalabraSecreta = "MiPalabraSecreta";
  
  
  async Autenticacion(Correo, Contrasena) {
    // bcrypt.hash(ClaveSinEncriptar, 10, function(err, hash) {
    //   console.log(hash); //Clave encriptada
    // });
    
    let Usuario = await prisma.usuario.findFirst({
      where: {
        Correo: Correo,
      },
      select: {
        Rol: true,
        Contrasena: true,
        Correo: true,
        UsuarioID: true
      }
    });
 
    let Resultado;
    try {
      Resultado = await bcrypt.compare(Contrasena, Usuario.Contrasena);
    } catch (err) {
      console.log(err);
    }
    if (Resultado === true) {
      return this.GenerarToken(Usuario.Rol, Usuario.Correo, Usuario.UsuarioID);
    } else {
      return false;
    }
  };

  async GenerarToken(Rol, Correo, UsuarioID) {
    if (UsuarioID == null || UsuarioID === '') {
      console.error('UsuarioID no puede estar vacío.');
      return null; // O lanzar un error si prefieres
    }
    let token = jwt.sign({ Rol, Correo, UsuarioID }, this.PalabraSecreta, { expiresIn: '10m' }); 
    
    await prisma.usuario.update({
      where: { 
        UsuarioID: UsuarioID,
      },
      data: {
        Token: token,
      },
    });
    return token;
  }
  
  async ValidarToken(solicitud) {
    let token;
    try {
      token = solicitud.headers.authorization.split(" ")[1];
    } catch (err) {
      return err;
    }
    let Resultado;
    // Validación del token
    try {
      Resultado = await jwt.verify(token, this.PalabraSecreta);
    } catch(err) {
      return err;
    }
    // ¿El token brindado es del usuario?
    let Usuario = await prisma.usuario.findFirst({
      where: {
        Correo: Resultado.Correo,
      },
    });
    if (Usuario.Token === token) {
      return Resultado;
    } else {
      return false;
    }
  };

  async DesAutenticacion(UsuarioID) {
    try {
      await prisma.usuario.update({
        where: { 
          UsuarioID: UsuarioID,
        },
        data: {
          Token: "Sesión cerrada",
        },
      });
    } catch (err) {
    console.log(err);
    }
  }
}

module.exports = Usuarios;