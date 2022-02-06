const express = require('express');
const reservas = require('../rutas/reservas');
const reportes = require('../rutas/reportes');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/reservas', reservas);
    app.use('/api/reportes', reportes);
}