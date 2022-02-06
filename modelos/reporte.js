const mongoose = require('mongoose');
const Joi = require('joi');

const esquemaReporte = new mongoose.Schema({
    mes: {
        type: Number,
    },
    comensalesVeganos: {
        type: Number
    },
    comensalesOmnivoro: {
        type: Number
    },
    comensalesSintacc: {
        type: Number
    }
});

const Reporte = mongoose.model('Reporte', esquemaReporte);

exports.Reporte = Reporte;