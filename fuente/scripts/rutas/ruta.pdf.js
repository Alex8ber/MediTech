const express = require('express');
const { buildPDFPaciente, buildPDFPersonal, buildPDFDoctores, buildPDFPersonalSolo, buildPDFHistorial, buildPDFCitas} = require('../model/model.pdf');

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

router.get('/pdfgeneral', (req, res) => {
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="reporte-personal.pdf"'
    });

    buildPDFPersonal(
        (data) => stream.write(data),
        () => stream.end()
    );

});

router.get('/pdfdoctores', (req, res) => {
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="reporte-doctores.pdf"'
    });

    buildPDFDoctores(
        (data) => stream.write(data),
        () => stream.end()
    );
});

router.get('/pdfpersonal', (req, res) => {
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="reporte-personal.pdf"'
    });

    buildPDFPersonalSolo(
        (data) => stream.write(data),
        () => stream.end()
    );

});

router.get('/pdfhistorial/:id', (req, res) => {
    const id = req.params.id;
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="historial-medico.pdf"'
    });

    buildPDFHistorial(id, (data) => stream.write(data), () => stream.end());
});

router.get('/pdfcitas', (req, res) => {
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="reporte-citas.pdf"'
    });

    buildPDFCitas(
        (data) => stream.write(data),
        () => stream.end()
    );
});

module.exports = router;