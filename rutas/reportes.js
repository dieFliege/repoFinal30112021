const express = require('express');
const router = express.Router();

const {Reporte} = require('../modelos/reporte');

router.get('/:mes', async(req, res) => {
    let errorReporte = { errMsg: '' };
    if(req.params.mes >= 1 && req.params.mes <= 12){
        let reporte = await Reporte.findOne({ mes: req.params.mes });
        if(reporte){
            res.send(reporte);
        } else {
            errorReporte.errMsg = `Durante el mes ${req.params.mes} no hubo ninguna reserva.`;
            res.status(404).send(errorReporte.errMsg);
        }
    } else {
        errorReporte.errMsg = 'Error. El mes no puede ser ni menor a 1 ni mayor a 12.';
        res.status(400).send(errorReporte.errMsg);
    }
});