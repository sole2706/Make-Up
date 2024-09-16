const express = require("express");

const ServicioSolicitantes = require("./../services/solicitante.js");
const Solicitantes = new ServicioSolicitantes();
const ServicioUsuarios = require('./../services/usuarios.js');
const Usuarios = new ServicioUsuarios();

const Router = express.Router();
Router.post("/listar", async (solicitud, respuesta) => {
  let Resultado;
  try {
    Resultado = await Usuarios.ValidarToken(solicitud);
  } catch (error) {
    respuesta.status(401).json(error);
  }
  if (Resultado.Rol === "UsuarioNivel0"|| "AdminNivel1") {
    const Solicitantes = await listadoDeSolicitantes(solicitud.params.SolicitanteID);
    Solicitantes.push({ Token: await Usuarios.GenerarToken(Resultado.Rol, Resultado.Correo, Resultado.UsuarioID)});
    respuesta.json(Solicitantes);
  } else {
    respuesta.status(401).json();
  }
});
// Buscador de Solicitantes
function listadoDeSolicitantes(SolicitanteID) {
  return Solicitantes.Listar(SolicitanteID);
}

// Buscar todos los solicitantes
Router.get("/", async (solicitud, respuesta) => {
  const solicitantes = await listadoDeSolicitantes(solicitud.params.SolicitanteID);
  respuesta.json(solicitantes);
});

// Buscar un solicitante en específico
Router.get("/:SolicitanteID", async (solicitud, respuesta) => {
  const solicitante = await listadoDeSolicitantes(solicitud.params.SolicitanteID);
  respuesta.json(solicitante);
});

// Crear un solicitante
Router.post("/", async (solicitud, respuesta) => {
  const { NombreSolicitante, ApellidoSolicitante, Telefono, Correo } = solicitud.body;
  const nuevoSolicitante = {
    NombreSolicitante: NombreSolicitante,
    ApellidoSolicitante: ApellidoSolicitante,
    Telefono: Telefono,
    Correo: Correo
  };
  const resultado = await Solicitantes.Agregar(nuevoSolicitante);
  respuesta.json(resultado);
});

// Borrar un solicitante
Router.delete("/:SolicitanteID", async (solicitud, respuesta) => {
  const { SolicitanteID } = solicitud.params;
  const resultado = await Solicitantes.Borrar(SolicitanteID);
  respuesta.json(resultado);
});

// Actualizar un solicitante
Router.put("/:SolicitanteID", async (solicitud, respuesta) => {
  const { SolicitanteID } = solicitud.params;
  const { NombreSolicitante, ApellidoSolicitante, Telefono, Correo } = solicitud.body;
  const solicitanteActualizado = {
    NombreSolicitante: NombreSolicitante,
    ApellidoSolicitante: ApellidoSolicitante,
    Telefono: Telefono,
    Correo: Correo
  };
  const resultado = await Solicitantes.Actualizar(SolicitanteID, solicitanteActualizado);
  respuesta.json(resultado);
});

module.exports = Router;
