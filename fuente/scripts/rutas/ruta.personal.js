const express = require('express')
const router = express.Router();
const personal = require('../model/model.personal');

router.get('/personal', function(req, res) {
    personal.ver_personal().then(personal => {
        res.render('Personal/personal.ejs', { personal: personal });
    })
    .catch(err => {
        return res.status(500).send('Error al obtener el personal : ' + err.message);
    })
})

router.get('/buscar-personal', function(req, res) {
    const filtro = req.query.q || '';
    personal.buscar_personal(filtro).then(personal => {
        res.json(personal);
    })
    .catch(err => {
        return res.status(500).send('Error al buscar personal: ' + err.message);
    })
});

router.get('/registrarpersonal', async(req, res) => {
    try {
        const especialidades = await personal.obtener_especialidades();
        const ocupaciones = await personal.obtener_ocupaciones();
        res.render('Personal/registrarpersonal.ejs', { especialidades, ocupaciones});
    } catch (error) {
        console.error('Error al obtener datos para registrar personal:', error);
        res.status(500).send('Error al obtener datos para registrar personal');
    }
});

router.post('/registrarpersonal', (req, res) => {
    const { nombre, apellido, cedula, edad, genero_id, ocupacion_id, especialidad_id } = req.body;
    if (!nombre || !apellido || !cedula || !edad || !genero_id || !ocupacion_id || !especialidad_id) {
        return res.status(500).send('Todos los campos son obligatorios');
    }
    personal.agregar_personal(nombre, apellido, cedula, edad, genero_id, ocupacion_id, especialidad_id).then(() => {
        res.redirect('/personal');
    })
    .catch(err => {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('La cédula ya está registrada');
        }
        console.error('Error al agregar personal:', err);
        return res.status(500).send('Error al agregar personal');
    });
});

router.get('/eliminarpersonal/:id', (req, res) => {
    personal.eliminar_personal(req.params.id).then(() => {
        res.redirect('/personal');
    })
    .catch(err => {
        console.error('Error al eliminar personal:', err);
        return res.status(500).send('Error al eliminar personal');
    });
});


module.exports = router