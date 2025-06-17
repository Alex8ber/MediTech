const express = require('express')
const router = express.Router();
const historial = require('../model/model.historial');
const paciente = require('../model/model.paciente');



router.get('/registrarhistorial/:id', async (req, res) => {
    try {
        const pacienteData = await historial.obtenerPacientePorId(req.params.id);
        const civil = await paciente.obtener_Civil();
        const tiposDeSangre = await paciente.obtener_Sangre();
        res.render('historial/registrarhistorial.ejs', { paciente: pacienteData, civil, tiposDeSangre });
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        res.status(500).send('Error al obtener el paciente');
    }
});

module.exports = router;