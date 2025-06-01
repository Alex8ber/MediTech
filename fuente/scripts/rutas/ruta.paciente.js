const express = require('express');
const router = express.Router();

const paciente = require('../model/model.paciente');

router.get('/', (req, res) => {
    paciente.ver_paciente().then(pacientes => {
        res.render('pacientes.ejs');
    })
    .catch(error => {
        console.error('Error al obtener los pacientes:', error);
        res.status(500).send('Error al obtener los pacientes');
    });
});

module.exports = router;