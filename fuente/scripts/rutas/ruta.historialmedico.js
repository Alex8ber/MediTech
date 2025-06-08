const express = require('express')
const router = express.Router();
const historial = require('../model/model.historial');
const paciente = require('../model/model.paciente');

router.get('/historialmedico', (req, res) => {
    historial.ver_historial().then(historiales => {
        res.render('historial/historialmedico.ejs', {historiales: historiales});
    })
    .catch(error => {
        console.error('Error al obtener el historial médico:', error);
        res.status(500).send('Error al obtener el historial médico');
    })
});

router.get('/registrarhistorial/:id', (req, res) => {
    historial.obtenerPacientePorId(req.params.id).then(paciente => {
        res.render('historial/registrarhistorial.ejs', {paciente})
    })
    .catch(error => {
        res.status(500).send('Error al obtener el paciente');
    });
});

module.exports = router;