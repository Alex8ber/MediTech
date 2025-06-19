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
        const examenfisico = await historial.ver_examen_fisico(req.params.id);
        res.render('historial/registrarhistorial.ejs', { paciente: pacienteData, civil, tiposDeSangre, citas, examenfisico });
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        res.status(500).send('Error al obtener el paciente');
    }
});

router.post('/registrarExamenFisico/:id', async (req, res) => {
    try {
        const { peso, altura, presion_arterial, frecuencia_cardiaca, frecuencia_respiratoria, imc, alergias } = req.body;
        await historial.actualizar_examen_fisico(
            req.params.id,
            peso,
            altura,
            presion_arterial,
            frecuencia_cardiaca,
            frecuencia_respiratoria,
            imc,
            alergias
        );
        res.redirect(`/registrarhistorial/${req.params.id}`);
    } catch (error) {
        console.error('Error al actualizar examen físico:', error);
        res.status(500).send('Error al actualizar examen físico');
    }
});
module.exports = router;