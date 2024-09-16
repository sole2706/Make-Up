const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Solicitantes {

  constructor() {

  };

  async Agregar(Solicitante) {
    let resultado;
    try {
      resultado = await prisma.solicitantes.create({
        data: {
          NombreSolicitante: Solicitante.NombreSolicitante,
          ApellidoSolicitante: Solicitante.ApellidoSolicitante,
          Telefono: parseInt(Solicitante.Telefono),
          Correo: Solicitante.Correo,
        }
      });
      let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se creo el solicitante:` + Solicitante.NombreSolicitante,
        },
      });
      console.log(auditoria);
    } catch (error) {
      console.error(`No se pudo insertar el solicitante ${Solicitante.NombreSolicitante} debido al error: ${error}`);
    }
    return resultado;
  };

  async Actualizar(SolicitanteID, Solicitante) {
    let resultado;
    try {
      resultado = await prisma.solicitantes.update({
        where: { SolicitanteID: parseInt(SolicitanteID) },
        data: {
          NombreSolicitante: Solicitante.NombreSolicitante,
          ApellidoSolicitante: Solicitante.ApellidoSolicitante,
          Telefono: parseInt(Solicitante.Telefono),
          Correo: Solicitante.Correo,
        },
      });
      let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se modifico el solicitante:` + Solicitante.NombreSolicitante,
        },
      });
      console.log(auditoria);
    } catch (error) {
      console.error(`No se pudo actualizar el solicitante ${SolicitanteID} debido al error: ${error}`);
    }
    return resultado;
  };

  async Borrar(SolicitanteID) {
    let resultado;
    try {
      resultado = await prisma.solicitantes.delete({
        where: {
          SolicitanteID: parseInt(SolicitanteID),
        },
      });
      let auditoria;
      auditoria = await prisma.auditoria.create({
        data: {
          DescripcionDeAccion: `Se borro el solicitante:` + SolicitanteID,
        },
      });
      console.log(auditoria);
    } catch (error) {
      console.error(`No se pudo borrar el solicitante ${SolicitanteID} debido al error: ${error}`);
    }
    return resultado;
  };

  Listar(SolicitanteID) {
    let Solicitantes;
    if (SolicitanteID === undefined) {
      Solicitantes = prisma.solicitantes.findMany();
    } else {
      Solicitantes = prisma.solicitantes.findMany({
        where: {
          SolicitanteID: parseInt(SolicitanteID),
        },
      });
    }
    return Solicitantes;
  };
}

module.exports = Solicitantes;
