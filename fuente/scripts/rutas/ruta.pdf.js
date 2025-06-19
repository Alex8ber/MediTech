const express = require('express');
const buildPDF = require('../model/model.pdf');

const router = express.Router();

router.get('/pdfpaciente', (req, res) => {
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="reporte-paciente.pdf"'
    });

    buildPDF(
        (data) => stream.write(data),
        () => stream.end()
    );

});

module.exports = router;