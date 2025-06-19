const express = require('express');
const router = express.Router();
const modelo = require('../model/model.reporte.js');

router.get('/reportes', async function(req, res) {
    try {
        // Obtener los datos necesarios para los reportes
        const totalPacientes = await modelo.getTotalPacientes();
        const totalDoctores = await modelo.getTotalDoctores();
        const doctoresPorEspecialidad = await modelo.getDoctoresPorEspecialidad();
        const personalNoDoctores = await modelo.getPersonalNoDoctoresPorTipo();
        const pacientesPorCondicion = await modelo.getPacientesPorCondicion();
        // Obtener las citas totales y por fecha
        const citasTotales = await modelo.getCitasTotales();
        const citasHoy = await modelo.getCitasHoy();
        const citasMes = await modelo.getCitasMes();
        const citasAnno = await modelo.getCitasAnno();
        // Renderizar la vista de reportes con los datos obtenidos
        res.render('reportes.ejs', {
            pacientes: totalPacientes,
            doctores: totalDoctores,
            doctoresPorEspecialidad: doctoresPorEspecialidad,
            personalNoDoctores: personalNoDoctores,
            pacientesPorCondicion: pacientesPorCondicion,
            citasTotales,
            citasHoy,
            citasMes,
            citasAnno
        });
    } catch (err) {
        console.error('Error al obtener datos para reportes:', err);
        res.status(500).send('Error al obtener los datos para los reportes.');
    }
});

module.exports = router;