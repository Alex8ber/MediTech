const express = require('express');
const { buildPDFPaciente, buildPDFPersonal } = require('../model/model.pdf');

const router = express.Router();

router.get('/pdfpacientes', (req, res) => {
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="reporte-paciente.pdf"'
    });

    buildPDFPaciente(
        (data) => stream.write(data),
        () => stream.end()
    );

});

router.get('/pdfpersonal', (req, res) => {
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="reporte-personal.pdf"'
    });

    buildPDFPersonal(
        (data) => stream.write(data),
        () => stream.end()
    );

});

module.exports = router;