const express = require('express');
const router = express.Router();

const contador = require('../herramientas/contador');
const formater = require('../herramientas/formater');

const {Reserva, validarReserva} = require('../modelos/reserva');
const {Reporte} = require('../modelos/reporte');

router.post('/', async(req, res) => {
    let { error } = validarReserva(req.body);
    if(!error){
        let errorReserva = { errMsg: '' };
        let reserva = await Reserva.findOne({ mes: req.body.mes, dia: req.body.dia, hora: req.body.hora });
        if(!reserva){
            if(req.body.comensales == req.body.menues.length){
                reserva = new Reserva({
                    dia: reserva.dia,
                    mes: reserva.mes,
                    hora: reserva.hora,
                    responsable: reserva.responsable,
                    telefono: reserva.telefono,
                    comensales: reserva.comensales,
                    menues: formater.minusculas(reserva.menues)
                });
                let reporte = await Reporte.findOne({ mes: reserva.mes });
                if(reporte){
                    reporte.comensalesVeganos += contador.contarCuantos('vegano', reserva.menues);
                    reporte.comensalesOmnivoros += contador.contarCuantos('omnivoro', reserva.menues);
                    reporte.comensalesSintacc += contador.contarCuantos('sin tacc', reserva.menues);
                } else {
                    reporte = new Reporte({
                        mes: reserva.mes,
                        comensalesVeganos: contador.contarCuantos('vegano', reserva.menues),
                        comensalesOmnivoros: contador.contarCuantos('omnivoro', reserva.menues),
                        comensalesSintacc: contador.contarCuantos('sin tacc', reserva.menues)
                    });
                }
                await reserva.save();
                await reporte.save();
                res.send(reserva);
            } else {
                errorReserva.errMsg = 'Error. La cantidad de menúes no coincide con la cantidad de comensales.';
                res.status(400).send(errorReserva.errMsg);
            }
        } else {
            errorReserva.errMsg = 'Error. Este horario ya estaba reservado.';
            res.status(400).send(errorReserva.errMsg);
        }
    } else {
        error.errMsg = error.details[0].message;
        res.status(400).send(error.errMsg);
    }
});