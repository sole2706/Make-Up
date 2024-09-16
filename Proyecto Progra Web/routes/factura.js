const express = require("express");

const ServicioFacturas = require("./../services/factura.js");
const Facturas = new ServicioFacturas();
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
    const Facturas = await listadoDeFacturas(solicitud.params.FacturaID);
    Facturas.push({ Token: await Usuarios.GenerarToken(Resultado.Rol, Resultado.Correo, Resultado.UsuarioID)});
    respuesta.json(Facturas);
  } else {
    respuesta.status(401).json();
  }
});

// Buscador de Facturas
function listadoDeFacturas(FacturaID) {
  return Facturas.Listar(FacturaID);
}

// Buscar todas las facturas
Router.get("/", async (solicitud, respuesta) => {
  const facturas = await listadoDeFacturas(solicitud.params.FacturaID);
  respuesta.json(facturas);
});

// Buscar una factura en específico
Router.get("/:FacturaID", async (solicitud, respuesta) => {
  const factura = await listadoDeFacturas(solicitud.params.FacturaID);
  respuesta.json(factura);
});

// Crear una factura
Router.post("/", async (solicitud, respuesta) => {
  const { FechaDeCreacion, TipoCita, Subtotal, Total, SolicitanteID } = solicitud.body;
  const nuevaFactura = {
    FechaDeCreacion: FechaDeCreacion ? new Date(FechaDeCreacion) : new Date(),
    TipoCita: TipoCita || 'MakeUp',
    Subtotal: Subtotal,
    Total: Total,
    SolicitanteID: SolicitanteID
  };
  const resultado = await Facturas.Agregar(nuevaFactura);
  respuesta.json(resultado);
});

// Borrar una factura
Router.delete("/:FacturaID", async (solicitud, respuesta) => {
  const { FacturaID } = solicitud.params;
  const resultado = await Facturas.Borrar(FacturaID);
  respuesta.json(resultado);
});

// Actualizar una factura
Router.put("/:FacturaID", async (solicitud, respuesta) => {
  const { FacturaID } = solicitud.params;
  const { FechaDeCreacion, TipoCita, Subtotal, Total, SolicitanteID } = solicitud.body;
  const facturaActualizada = {
    FechaDeCreacion: FechaDeCreacion ? new Date(FechaDeCreacion) : undefined,
    TipoCita: TipoCita,
    Subtotal: Subtotal,
    Total: Total,
    SolicitanteID: SolicitanteID
  };
  const resultado = await Facturas.Actualizar(FacturaID, facturaActualizada);
  respuesta.json(resultado);
});

module.exports = Router;
