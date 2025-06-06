const express = require('express')
const router = express.Router()
const agenda = require('../model/model.agenda')
const doctores = require('../model/model.doctores'); // Agrega esta línea
const paciente = require('../model/model.paciente'); // Agrega esta línea

router.get('/agenda', function (req, res) {
    res.render('agenda.ejs')
})

router.get('/citas', async function (req, res) {
    try {
        const patologias = await agenda.obtenerPatologias();
        const estados = await agenda.obtenerEstado();
        const especialidades = await doctores.obtener_especialidades();
        const pacientes = await paciente.ver_paciente(); // Obtén pacientes
        res.render('citas.ejs', { patologias, estados, especialidades, pacientes });
    } catch (err) { 
        console.log(err);
        res.render('citas.ejs', { error: 'Error cargando datos' });
    }
});

router.post('/citas', async function (req, res) {
    try {
        // Asegúrate de que req.body tenga los campos necesarios
        if (!req.body.pacienteId || !req.body.personalId || !req.body.observaciones || !req.body.estadoId || !req.body.fecha) {
            res.render('citas.ejs', { error: 'Todos los campos son obligatorios' });
        }else{
            const { pacienteId, personalId, observaciones, estadoId, fecha } = req.body;
            await agenda.insertarCita({ pacienteId, personalId, observaciones, estadoId, fecha });
            res.redirect('/agenda');
        }
        
    } catch (err) {
        res.render('citas.ejs', { error: 'Error al insertar la cita: ' + err.message });
    }
});

module.exports = router