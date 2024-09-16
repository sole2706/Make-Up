const express = require("express");
const routerUsuario = require('./usuarios.js');
const routerFactura = require('./factura.js');
const routerSolicitante = require('./solicitante.js');
const routerReservacion = require('./reservacion.js');

function routerAPI(app){
    app.use('/usuarios', routerUsuario);
    app.use('/factura', routerFactura);
    app.use('/solicitante', routerSolicitante);
    app.use('/reservacion', routerReservacion);
    
}

module.exports = routerAPI;