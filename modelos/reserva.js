const mongoose = require('mongoose');
const Joi = require('joi');

const esquemaReserva = new mongoose.Schema({
    dia: {
        type: Number,
        min: 1,
        required: true
    },
    mes: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
    hora: {
        type: Number,
        min: 0,
        max: 23,
        required: true
    },
    responsable: {
        type: String,
        requried: true
    },
    telefono: {
        type: String,
        required: true
    },
    comensales: {
        type: Number,
        min: 1,
        required: true
    },
    menues: {
        type: Array,
        required: true
    }
});

const Reserva = mongoose.model('Reserva', esquemaReserva);

function validarReserva(reserva){
    const esquemaValido = Joi.object({
        dia: Joi.number().min(1).required(),
        mes: Joi.number().min(1).max(12).required(),
        hora: Joi.number().min(0).max(23).required(),
        responsable: Joi.string().required(),
        telefono: Joi.string().regex(/^[0-9]*$/).required(),
        comensales: Joi.number().min(1).required(),
        menues: Joi.array().items(Joi.string().regex(/('vegano'|'omnivoro'|'sin tacc')$/i)).required()
    });
    return esquemaValido.validate({
        dia: reserva.dia,
        mes: reserva.mes,
        hora: reserva.hora,
        responsable: reserva.responsable,
        telefono: reserva.telefono,
        comensales: reserva.comensales,
        menues: reserva.menues
    });
}

exports.Reserva = Reserva;
exports.validarReserva = validarReserva;