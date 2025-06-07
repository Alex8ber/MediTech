const express = require('express');
const router = express.Router();

const paciente = require('../model/model.paciente');

router.get('/pacientes', (req, res) => {
    paciente.ver_paciente().then(pacientes => {
        res.render('Pacientes/pacientes.ejs', { pacientes: pacientes });
    })
    .catch(error => {
        console.error('Error al obtener los pacientes:', error);
        res.status(500).send('Error al obtener los pacientes');
    });
});

router.get('/buscar-pacientes', (req, res) => {
    const filtro = req.query.q || '';
    const patologia = req.query.patologia || '';
    paciente.buscar_paciente(filtro, patologia).then(pacientes => {
        res.json(pacientes);
    })
    .catch(error => {
        console.error('Error al buscar pacientes:', error);
        res.status(500).send('Error al buscar pacientes');
    });
});

router.get('/registrarpaciente', (req, res) => {
    res.render('Pacientes/registrarpaciente.ejs');
});

router.post('/registrarpaciente', (req, res) => {
    const {
        nombre, apellido, cedula, edad, genero_id, patologia_id, telefono, email, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id, direccion
    } = req.body;
    if (
        !nombre || !apellido || !cedula || !edad || !genero_id || !patologia_id || !telefono || !email || !ocupacion || !estado_civil_id || !condicion_id || !tipo_de_sangre_id || !direccion
    ) {
        return res.status(500).send('Todos los campos son obligatorios');
    }
    paciente.agregar_paciente(
        nombre, apellido, cedula, edad, genero_id, patologia_id, email, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id, direccion, telefono
    ).then(() => {
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

module.exports = router;