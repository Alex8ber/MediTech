const PDFDocument = require('pdfkit-table');
const { Table } = require('pdfkit-table');
const pacientes = require('../model/model.paciente');
const personal = require('../model/model.personal');
const doctores = require('../model/model.doctores');
const agenda = require('../model/model.agenda');
const historial = require('../model/model.historial');
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


async function buildPDFHistorial(id, dataCallback, endCallback) {
    // Suponiendo que tienes una función que retorna un objeto con todas las secciones
    const datos = await historial.obtenerPacientePorId(id);
    const fisico = await historial.ver_examen_fisico(id);

    console.log('Historial:', datos);

    const doc = new PDFDocument({ autoFirstPage: false });
    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.addPage();

    // Título principal
    doc.fontSize(22).font('Helvetica-Bold').text('Historial Médico', { align: 'center' });
    doc.moveDown(1);

    // --- DATOS GENERALES ---
    doc.fontSize(16).font('Helvetica-Bold').text('Datos generales');
    doc.moveDown(0.5);

    const generales = [datos];
    // Tabla de datos generales
    const datosGenerales = generales.map(d => ({
        Nombres: d.Nombres,
        Apellidos: d.Apellidos,
        Cedula: d.Cedula,
        Telefono: d.Telefono,
        Edad: d.Edad,
        Genero: d.Genero,
        Patologia: d.Patologia,
        Email: d.Email,
        Ocupacion: d.Ocupacion,
        EstadoCivil: d['Estado Civil'],
        TipoSangre: d['Tipo de Sangre'],
        Direccion: d.Direccion 
    }))

    const datosgeneralespaciente = {
        headers: [
            { label: "Nombres", property: "Nombres", width: 90 },
            { label: "Apellidos", property: "Apellidos", width: 90 },
            { label: "Cedula", property: "Cedula", width: 65 },
            { label: "Telefono", property: "Telefono", width: 70 },
            { label: "Edad", property: "Edad", width: 40 },
            { label: "Genero", property: "Genero", width: 55 },
            { label: "Patologia", property: "Patologia", width: 70 }
        ],
        datas: datosGenerales
    }


    await doc.table( datosgeneralespaciente, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(11),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(10)
    });

    const datosExtraPaciente = {
        headers: [
            { label: "Email", property: "Email", width: 140 },
            { label: "Ocupación", property: "Ocupacion", width: 70 },
            { label: "Estado Civil", property: "EstadoCivil", width: 70 },
            { label: "Tipo de Sangre", property: "TipoSangre", width: 70 },
            { label: "Dirección", property: "Direccion", width: 130 }
        ],
        datas: datosGenerales
    }


    await doc.table( datosExtraPaciente, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(11),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(10)
    });
    doc.moveDown(3);




    // --- EXAMEN FÍSICO ---

    doc.fontSize(16).font('Helvetica-Bold').text('Examen físico');
    doc.moveDown(0.5);

    console.log('Examen Físico:', fisico);

    const datosfisicos = Array.isArray(fisico) ? fisico : [];

    // Tabla de examen físico (ejemplo)
    const examenFisico = datosfisicos.map(d => ({
        Peso: d.Peso,
        Altura: d.Altura,
        Presion_Arterial: d.Presion,
        Frecuencia_Cardica: d.Frecuencia,
        Frecuencia_Respiratoria: d.Respiratoria,
        IMC: d.IMC,
        Alergias: d.Alergias
    }))

    const datosfisicospaciente = {
        headers: [
            { label: "Peso", property: "Peso", width: 70 },
            { label: "Altura", property: "Altura", width: 70 },
            { label: "Presión Arterial", property: "Presion_Arterial", width: 70 },
            { label: "Frecuencia Cardica", property: "Frecuencia_Cardica", width: 70 },
            { label: "Frecuencia Respiratoria", property: "Frecuencia_Respiratoria", width: 70 },
            { label: "IMC", property: "IMC", width: 70 },
            { label: "Alergias", property: "Alergias", width: 70 }
        ],
        datas: examenFisico
    }

    await doc.table( datosfisicospaciente, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(11),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(10)
    });

    doc.moveDown(1);






    // --- DIAGNÓSTICO ---
    doc.fontSize(16).font('Helvetica-Bold').text('Diagnóstico');
    doc.moveDown(0.5);

    doc.fontSize(12).font('Helvetica').text(
    (datos.diagnostico && datos.diagnostico.Descripcion) 
    ? datos.diagnostico.Descripcion 
    : 'Sin diagnóstico registrado'
);

    doc.end();
}

module.exports = {
    buildPDFPaciente,
    buildPDFPersonal,
    buildPDFDoctores,
    buildPDFPersonalSolo,
    buildPDFHistorial
};