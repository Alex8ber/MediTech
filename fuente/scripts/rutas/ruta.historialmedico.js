const express = require('express')
const router = express.Router();
const historial = require('../model/model.historial');
const paciente = require('../model/model.paciente');
const agenda = require('../model/model.agenda');



router.get('/registrarhistorial/:id', async (req, res) => {
    try {
        const pacienteData = await historial.obtenerPacientePorId(req.params.id);
        const civil = await paciente.obtener_Civil();
        const tiposDeSangre = await paciente.obtener_Sangre();
        const citas = await agenda.obtenerCitasPorPaciente(req.params.id);
        res.render('historial/registrarhistorial.ejs', { paciente: pacienteData, civil, tiposDeSangre, citas });
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        res.status(500).send('Error al obtener el paciente');
    }
});

module.exports = router;