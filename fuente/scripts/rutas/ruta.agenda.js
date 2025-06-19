const express = require('express');
const router = express.Router();
const agenda = require('../model/model.agenda');
const paciente = require('../model/model.paciente');
const personal = require('../model/model.personal');

router.get('/agenda', async function (req, res) {
    try {
        const citas = await agenda.obtenerProximasCitas();
        const todasLasCitas = await agenda.obtenerTodasLasCitas();
        const citasHoy = await agenda.obtenerCitasHoy();
        const citasSemana = await agenda.obtenerCitasSemana();
        const citasMes = await agenda.obtenerCitasMes();
        const totalCitas = todasLasCitas.length; // <-- contador de citas programadas
        const pacientes = await require('../model/model.paciente').ver_paciente();
        const totalPacientes = pacientes.length;
        res.render('agenda.ejs', { citas, todasLasCitas, citasHoy, citasSemana, citasMes, totalCitas, totalPacientes });
    } catch (error) {
        res.status(500).send('Error cargando la agenda');
    }
});

router.get('/citas/:id', async function (req, res) {
    try {
        const estados = await agenda.obtenerEstado();
        const pacientes = await paciente.ver_paciente();
        const medicos = await personal.ver_personal();
        const especialidades = await agenda.obtenerEspecialidades();
        const pacienteSeleccionado = pacientes.find(p => p.id == req.params.id);
        if (!pacienteSeleccionado) {
            return res.status(404).send('Paciente no encontrado');
        }
        res.render('citas.ejs', { paciente: pacienteSeleccionado, pacientes, medicos, especialidades, error: null });
    } catch (error) { 
        console.log(error);
        res.status(500).send('Error cargando datos');
    }
});

router.post('/citas/:id', async function (req, res) {
    const { pacienteId, personalId, observaciones, fecha } = req.body;
    try {
        console.log(req.body);
        if (!req.body.pacienteId || !req.body.personalId || !req.body.observaciones || !req.body.fecha) {
            res.status(400).send({ error: 'Todos los campos son obligatorios' });
        }else{
            await agenda.insertarCita({ pacienteId, personalId, observaciones, fecha });
            res.redirect('/agenda');
        }

    } catch (error) {
        res.status(500).send({ error: 'Error al insertar la cita: ' + error.message });
    }
});

router.get('/doctores-por-especialidad/:especialidadId', async function (req, res) {
    try {
        const doctores = await personal.ver_doctores_por_especialidad(req.params.especialidadId);
        res.json(doctores);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo doctores' });
    }
});

module.exports = router