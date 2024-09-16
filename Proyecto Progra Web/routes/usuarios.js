const express = require("express");

const ServicioUsuarios = require("./../services/usuarios.js");
const { log, Console } = require("console");
const { Roles } = require("@prisma/client");
const Usuarios = new ServicioUsuarios();

const Router = express.Router();
Router.post("/listar", async (solicitud, respuesta) => {
  let Resultado;
  try {
    Resultado = await Usuarios.ValidarToken(solicitud);
  } catch (error) {
    respuesta.status(401).json(error);
  }
  if (Resultado.Rol === "AdminNivel1") {
    try {

    const usuariosList = await listadoDeUsuarios(solicitud.params.UsuarioID);
    const token = await Usuarios.GenerarToken(Resultado.Rol, Resultado.Correo, Resultado.UsuarioID);
    usuariosList.push({ Token: token });
    respuesta.json(usuariosList);
  } catch (error) {
    // Manejar el error, por ejemplo, imprimir un mensaje o registrar el error
    console.error('Error al generar el token:', error);
    throw error;
  }

  } else {
    respuesta.status(401).json();
  }
});

// Buscador de Usuarios
function listadoDeUsuarios(UsuarioID) {
  return Usuarios.Listar(UsuarioID);

};

// Buscar todos los usuarios
Router.get("/", async (solicitud, respuesta) => {
  const usuarios = await listadoDeUsuarios(solicitud.params.UsuarioID);
  respuesta.json(usuarios);
});

// Buscar un usuario en específico
Router.get("/:UsuarioID", async (solicitud, respuesta) => {
  const usuario = await listadoDeUsuarios(solicitud.params.UsuarioID);
  respuesta.json(usuario);
});

// Crear un usuario
Router.post("/", async (solicitud, respuesta) => {
  const { NombreUsuario, ApellidoUsuario, Telefono, Correo, Contrasena } = solicitud.body;
  const nuevoUsuario = {
    NombreUsuario: NombreUsuario,
    ApellidoUsuario: ApellidoUsuario,
    Telefono: parseInt(Telefono),
    Correo: Correo,
    Contrasena: Contrasena
  };
  const resultado = await Usuarios.Agregar(nuevoUsuario);
  respuesta.json(resultado);
});

// Borrar un usuario
Router.delete("/:UsuarioID", async (solicitud, respuesta) => {
  respuesta.json(Usuarios.Borrar(solicitud.params.UsuarioID));
  
});

// Actualizar un usuario
Router.put("/:UsuarioID", async (solicitud, respuesta) => {
  const { UsuarioID } = solicitud.params;
  const { NombreUsuario, ApellidoUsuario, Telefono, Correo, Contrasena } = solicitud.body;
  const usuarioActualizado = {
    NombreUsuario: NombreUsuario,
    ApellidoUsuario: ApellidoUsuario,
    Telefono: parseInt(Telefono),
    Correo: Correo,
    Contrasena: Contrasena
  };
  const resultado = await Usuarios.Actualizar(UsuarioID, usuarioActualizado);
  respuesta.json(resultado);
});

Router.post("/autenticar", async (solicitud, respuesta) => {
  respuesta.json(await Usuarios.Autenticacion(solicitud.body.Correo, solicitud.body.Contrasena));
 
  
});

Router.post("/validarToken", async (solicitud, respuesta) => {
  respuesta.json(await Usuarios.ValidarToken(solicitud));
});

Router.post("/desautenticar", async (solicitud, respuesta) => {
  respuesta.json(await Usuarios.DesAutenticacion(solicitud.body.UsuarioID));
});

module.exports = Router;
