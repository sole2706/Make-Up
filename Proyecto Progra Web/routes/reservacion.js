const express = require("express");

const ServicioReservaciones = require("./../services/reservacion.js");
const Reservaciones = new ServicioReservaciones();
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
  if (Resultado.Rol === "AdminNivel1") {
    const Reservaciones = await listadoDeReservaciones(solicitud.params.NumeroReservacion);
    Reservaciones.push({ Token: await Usuarios.GenerarToken(Resultado.Rol, Resultado.Correo, Resultado.UsuarioID)});
    respuesta.json(Reservaciones);
  } else {
    respuesta.status(401).json();
  }
});
// Buscador de Reservaciones
function listadoDeReservaciones(NumeroReservacion) {
  return Reservaciones.Listar(NumeroReservacion);
}


// Buscar todas las reservaciones
Router.get("/", async (solicitud, respuesta) => {
  const reservaciones = await listadoDeReservaciones(solicitud.params.NumeroReservacion);
  respuesta.json(reservaciones);
});



// Buscar una reservación en específico
Router.get("/:NumeroReservacion", async (solicitud, respuesta) => {
  const reservacion = await listadoDeReservaciones(solicitud.params.NumeroReservacion);
  respuesta.json(reservacion);
});

// Crear una reservación
Router.post("/", async (solicitud, respuesta) => {
  const { FechaDeReservacion, TipoCita, SolicitanteID } = solicitud.body;
  const nuevaReservacion = {
    FechaDeReservacion: FechaDeReservacion? new Date(FechaDeReservacion) : undefined,
    TipoCita: TipoCita,
    SolicitanteID: SolicitanteID
  };
  const resultado = await Reservaciones.Agregar(nuevaReservacion);
  respuesta.json(resultado);
});

// Borrar una reservación
Router.delete("/:NumeroReservacion", async (solicitud, respuesta) => {
  const { NumeroReservacion } = solicitud.params;
  const resultado = await Reservaciones.Borrar(NumeroReservacion);
  respuesta.json(resultado);
});

// Actualizar una reservación
Router.put("/:NumeroReservacion", async (solicitud, respuesta) => {
  const { NumeroReservacion } = solicitud.params;
  const { FechaDeReservacion, TipoCita, SolicitanteID } = solicitud.body;
  const reservacionActualizada = {
    FechaDeReservacion: FechaDeReservacion? new Date(FechaDeReservacion) : undefined,
    TipoCita: TipoCita,
    SolicitanteID: SolicitanteID
  };
  const resultado = await Reservaciones.Actualizar(NumeroReservacion, reservacionActualizada);
  respuesta.json(resultado);
});


module.exports = Router;
