const express = require('express');
const router = express.Router();
const agenda = require('../model/model.agenda');
const paciente = require('../model/model.paciente');
const personal = require('../model/model.personal');

router.get('/agenda', function (req, res) {
    res.render('agenda.ejs');
});

router.get('/citas:id', async function (req, res) {
    try {
        const patologias = await agenda.obtenerPatologias();
        const estados = await agenda.obtenerEstado();
        const especialidades = await personal.obtener_especialidades();
        const pacientes = await paciente.ver_paciente();
        const medicos = await personal.ver_personal();
        res.render('citas.ejs', { patologias, estados, especialidades, pacientes, medicos });
    } catch (error) { 
        console.log(error);
        res.status(500).send('Error cargando datos' );
    }
});

router.post('/citas:id', async function (req, res) {
    try {
        if (!req.body.pacienteId || !req.body.personalId || !req.body.observaciones || !req.body.estadoId || !req.body.fecha) {
            res.status(400).send({ error: 'Todos los campos son obligatorios' });
        }else{
            const { pacienteId, personalId, observaciones, estadoId, fecha } = req.body;
            await agenda.insertarCita({ pacienteId, personalId, observaciones, estadoId, fecha });
            res.redirect('/agenda');
        }

    } catch (error) {
        res.status(500).send({ error: 'Error al insertar la cita: ' + error.message });
    }
});

module.exports = router