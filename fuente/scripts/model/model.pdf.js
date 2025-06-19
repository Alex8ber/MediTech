const PDFDocument = require('pdfkit-table');
const { Table } = require('pdfkit-table');
const pacientes = require('../model/model.paciente');
const personal = require('../model/model.personal');
const doctores = require('../model/model.doctores');
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
        Ocupacion: p.Ocupacion,
        EstadoCivil: p['Estado Civil'],
        Telefono: p.Telefono,
        TipoSangre: p['Tipo de Sangre'],
        Direccion: p.direccion
    }));

    const doc = new PDFDocument({ autoFirstPage: false, layout : 'landscape' });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    
    doc.addPage();

    doc.fontSize(18).text('Pacientes Registrados', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text('Fecha: ' + new Date().toLocaleDateString(), { align: 'right' });
    doc.moveDown();


    const table = {
        headers: [
            { label: "Nombre", property: "Nombre", width: 90 },
            { label: "Apellido", property: "Apellido", width: 90 },
            { label: "Cédula", property: "Cedula", width: 65 },
            { label: "Edad", property: "Edad", width: 40 },
            { label: "Género", property: "Genero", width: 50 },
            { label: "Patología", property: "Patologia", width: 80 },
            { label: "Ocupación", property: "Ocupacion", width: 80 },
            { label: "Estado Civil", property: "EstadoCivil", width: 50 },
            { label: "Teléfono", property: "Telefono", width: 70 },
            { label: "Tipo de Sangre", property: "TipoSangre", width: 50 }
        ],
        datas: pacientesMapeados
    };

    await doc.table(table, {
        x : 60,
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

    const doc = new PDFDocument({ autoFirstPage: false, layout : 'landscape' });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.addPage();

    doc.fontSize(18).text('Personal Registrado', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text('Fecha: ' + new Date().toLocaleDateString(), { align: 'right' });
    doc.moveDown();


    const table = {
        headers: [
            { label: "Nombre", property: "Nombre", width: 90 },
            { label: "Apellido", property: "Apellido", width: 90 },
            { label: "Cédula", property: "Cedula", width: 65},
            { label: "Edad", property: "Edad", width: 40 },
            { label: "Género", property: "Genero", width: 50 },
            { label: "Ocupación", property: "Ocupacion", width: 70 },
            { label: "Especialidad", property: "Especialidad", width: 80 },
            { label: "Email", property: "Email", width: 140 }
        ],
        datas: personalMapeados
    };

    await doc.table(table, {
        x : 80,
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(8)
    });

    doc.end();
}

async function buildPDFDoctores(dataCallback, endCallback) {
    const listaDoctores = await doctores.ver_doctores() || [];
    console.log('Doctores:', listaDoctores);

    const doctoresArray = Array.isArray(listaDoctores) ? listaDoctores : [];

    const doctoresMapeados = doctoresArray.map(p => ({
        Nombre: p.Nombre || '',
        Apellido: p.Apellido || '',
        Cedula: p.Cedula || '',
        Edad: p.Edad || '',
        Genero: p.Genero || '',
        Ocupacion: p.Ocupacion || '',
        Especialidad: p.Especialidad || '',
        Email: p.Email || ''
    }));

    const doc = new PDFDocument({ autoFirstPage: false, layout : 'landscape' });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.addPage();

    doc.fontSize(18).text('Doctores Registrado', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text('Fecha: ' + new Date().toLocaleDateString(), { align: 'right' });
    doc.moveDown();


    const table = {
        headers: [
            { label: "Nombre", property: "Nombre", width: 90 },
            { label: "Apellido", property: "Apellido", width: 90 },
            { label: "Cédula", property: "Cedula", width: 65},
            { label: "Edad", property: "Edad", width: 40 },
            { label: "Género", property: "Genero", width: 50 },
            { label: "Ocupación", property: "Ocupacion", width: 70 },
            { label: "Especialidad", property: "Especialidad", width: 80 },
            { label: "Email", property: "Email", width: 140 }
        ],
        datas: doctoresMapeados
    };

    await doc.table(table, {
        x : 80,
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(8)
    });

    doc.end();
}

async function buildPDFPersonalSolo(dataCallback, endCallback) {
    const listaPersonal = await personal.ver_solo_personal() || [];
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

    const doc = new PDFDocument({ autoFirstPage: false, layout : 'landscape' });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.addPage();

    doc.fontSize(18).text('Personal Registrado', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text('Fecha: ' + new Date().toLocaleDateString(), { align: 'right' });
    doc.moveDown();


    const table = {
        headers: [
            { label: "Nombre", property: "Nombre", width: 90 },
            { label: "Apellido", property: "Apellido", width: 90 },
            { label: "Cédula", property: "Cedula", width: 65},
            { label: "Edad", property: "Edad", width: 40 },
            { label: "Género", property: "Genero", width: 50 },
            { label: "Ocupación", property: "Ocupacion", width: 70 },
            { label: "Especialidad", property: "Especialidad", width: 80 },
            { label: "Email", property: "Email", width: 140 }
        ],
        datas: personalMapeados
    };

    await doc.table(table, {
        x : 80,
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(8)
    });

    doc.end();
}

module.exports = {
    buildPDFPaciente,
    buildPDFPersonal,
    buildPDFDoctores,
    buildPDFPersonalSolo
};