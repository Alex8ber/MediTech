const PDFDocument = require('pdfkit-table');
const { Table } = require('pdfkit-table');
const pacientes = require('../model/model.paciente');


async function buildPDF (dataCallback, endCallback) {
    const listaPacientes = await pacientes.ver_paciente() || [];
    console.log('Pacientes:', listaPacientes);

    const pacientesArray = Array.isArray(listaPacientes) ? listaPacientes : [];

    const pacientesMapeados = pacientesArray.map(p => ({
        Nombre: p.Nombre,
        Apellido: p.Apellido,
        Cedula: p.Cedula,
        Edad: p.Edad,
        Genero: p.Genero,
        Patologia: p.Patologia,
        Telefono: p.Telefono,
        TipoSangre: p['Tipo de Sangre']
    }));

    const doc = new PDFDocument({ autoFirstPage: false });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    
    doc.addPage();

    doc.fontSize(18).text('Reporte de Pacientes Registrados', { align: 'center' });
    doc.moveDown();

    const table = {
        headers: [
            { label: "Nombre", property: "Nombre", width: 70 },
            { label: "Apellido", property: "Apellido", width: 70 },
            { label: "Cédula", property: "Cedula", width: 70 },
            { label: "Edad", property: "Edad", width: 40 },
            { label: "Género", property: "Genero", width: 60 },
            { label: "Patología", property: "Patologia", width: 80 },
            { label: "Teléfono", property: "Telefono", width: 70 },
            { label: "Tipo de Sangre", property: "TipoSangre", width: 70 }
        ],
        datas: pacientesMapeados
    };

    await doc.table(table, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(9)
    });

    doc.end();
};

module.exports = buildPDF;