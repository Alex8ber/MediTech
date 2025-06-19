const PDFDocument = require('pdfkit-table');
const { Table } = require('pdfkit-table');
const pacientes = require('../model/model.paciente');
const personal = require('../model/model.personal');
const { x } = require('pdfkit');


async function buildPDFPaciente (dataCallback, endCallback) {
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

    doc.fontSize(18).text('Pacientes Registrados', { align: 'center' });
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
        x : 40,
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(9)
    });

    doc.end();
};



async function buildPDFPersonal(dataCallback, endCallback) {
    const listaPersonal = await personal.ver_personal() || [];
    console.log('Personal:', listaPersonal);

    const personalArray = Array.isArray(listaPersonal) ? listaPersonal : [];

    const personalMapeados = personalArray.map(p => ({
        Nombre: p.Nombre || '',
        Apellido: p.Apellido || '',
        Cedula: p.Cedula || '',
        Edad: p.Edad || '',
        Genero: p.Genero || '',
        Ocupacion: p.Ocupacion || '',
        Especialidad: p.Especialidad || '',
        Email: p.Email || ''
    }));

    const doc = new PDFDocument({ autoFirstPage: false });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.addPage();

    doc.fontSize(18).text('Personal Registrado', { align: 'center' });
    doc.moveDown();

    const table = {
        headers: [
            { label: "Nombre", property: "Nombre", width: 80 },
            { label: "Apellido", property: "Apellido", width: 80 },
            { label: "Cédula", property: "Cedula", width: 50 },
            { label: "Edad", property: "Edad", width: 35 },
            { label: "Género", property: "Genero", width: 45 },
            { label: "Ocupación", property: "Ocupacion", width: 70 },
            { label: "Especialidad", property: "Especialidad", width: 80 },
            { label: "Email", property: "Email", width: 120 }
        ],
        datas: personalMapeados
    };

    await doc.table(table, {
        x : 25,
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(8)
    });

    doc.end();
}

module.exports = {
    buildPDFPaciente,
    buildPDFPersonal
};