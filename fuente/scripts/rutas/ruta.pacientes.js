const express = require('express');
const router = express.Router();

const paciente = require('../model/model.paciente');
const agenda = require('../model/model.agenda');
const doctores = require('../model/model.doctores');

router.get('/pacientes', async (req, res) => {
    try {
        const [pacientesList, generos, tiposDeSangre] = await Promise.all([
            paciente.ver_paciente(),
            paciente.obtener_Generos(),
            paciente.obtener_Sangre()
        ]);
        res.render('Pacientes/pacientes.ejs', { 
            pacientes: pacientesList, 
            generos, 
            tiposDeSangre 
        });
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        res.status(500).send('Error al obtener los pacientes');
    }
});

router.get('/buscar-pacientes', (req, res) => {
    const filtro = req.query.q || '';
    const patologia = req.query.patologia || '';
    const genero = req.query.genero || '';
    const sangre = req.query.sangre || '';
    paciente.buscar_paciente(filtro, patologia, genero, sangre).then(pacientes => {
        res.json(pacientes);
    })
    .catch(error => {
        console.error('Error al buscar pacientes:', error);
        res.status(500).send('Error al buscar pacientes');
    });
});

router.get('/registrarpaciente', async(req, res) => {
    try {
        const [tiposDeSangre, civil] = await Promise.all([
            paciente.obtener_Sangre(),
            paciente.obtener_Civil()
        ]);
        res.render('Pacientes/registrarpaciente.ejs', { tiposDeSangre, civil });
    } catch (error) {
        console.error('Error al obtener datos para registrar paciente:', error);
        res.status(500).send('Error al obtener datos para registrar paciente');
    };
});

router.post('/registrarpaciente', (req, res) => {
    const {
        nombre, apellido, cedula, edad, genero_id, patologia, telefono, email, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id, direccion
    } = req.body;
    if (
        !nombre || !apellido || !cedula || !edad || !genero_id || !patologia || !telefono || !email || !ocupacion || !estado_civil_id || !condicion_id || !tipo_de_sangre_id || !direccion
    ) {
        return res.status(500).send('Todos los campos son obligatorios');
    }
    paciente.agregar_paciente(
        nombre, apellido, cedula, edad, genero_id, patologia, email, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id, direccion, telefono).then(() => {
        res.redirect('/pacientes');
    })
    .catch(err => {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('La cédula ya está registrada');
        }
        console.error('Error al agregar paciente:', err);
        return res.status(500).send('Error al agregar paciente');
    });
});

router.get('/eliminarpaciente/:id', (req, res) => {
    paciente.eliminar_paciente(req.params.id).then(() => {
        res.redirect('/pacientes');
    })
    .catch(err => {
        console.error('Error al eliminar paciente:', err);
        return res.status(500).send('Error al eliminar paciente');
    });
});

router.get('/editarpaciente/:id', async(req, res) => {
    try {
        const [patologias, pacientes, tiposDeSangre, civil, pacienteData] = await Promise.all([
        agenda.obtenerPatologias(),
        paciente.ver_paciente(),
        paciente.obtener_Sangre(),
        paciente.obtener_Civil(),
        paciente.editar_paciente(req.params.id)
    ]);
    res.render('Pacientes/editarpaciente.ejs', {paciente: pacienteData, patologias, pacientes, tiposDeSangre, civil});
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        res.status(500).send('Error al obtener el paciente');
    }
});

router.post('/editarpaciente/:id', (req, res) => {
    const {paciente_id, nombre, apellido, cedula, edad, genero_id, patologia, email, telefono, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id, direccion} = req.body;
    if ( !nombre || !apellido || !cedula || !edad || !genero_id || !patologia || !email || !telefono || !ocupacion || !estado_civil_id || !condicion_id || !tipo_de_sangre_id || !direccion) {
        return res.status(500).send('Todos los campos son obligatorios');
    }
    paciente.actualizar_paciente(paciente_id, nombre, apellido, cedula, edad, genero_id, patologia, email, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id, direccion, telefono).then(() => {
        res.redirect('/pacientes');
    })
    .catch(err => {
        console.error('Error al editar paciente:', err);
        return res.status(500).send('Error al editar paciente');
    });
})

module.exports = router;