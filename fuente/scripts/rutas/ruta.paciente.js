const express = require('express');
const router = express.Router();

const paciente = require('../model/model.paciente');

router.get('/pacientes', (req, res) => {
    paciente.ver_paciente().then(pacientes => {
        res.render('Pacientes/pacientes.ejs', { pacientes: pacientes });
    })
    .catch(error => {
        console.error('Error al obtener los pacientes:', error);
        res.status(500).send('Error al obtener los pacientes');
    });
});

router.get('/buscar-pacientes', (req, res) => {
    const filtro = req.query.q || '';
    const patologia = req.query.patologia || '';
    paciente.buscar_paciente(filtro, patologia).then(pacientes => {
        res.json(pacientes);
    })
    .catch(error => {
        console.error('Error al buscar pacientes:', error);
        res.status(500).send('Error al buscar pacientes');
    });
});

module.exports = router;