const express = require('express')
const router = express.Router();
const personal = require('../model/model.personal');
const modelo = require('../model/model.register');

router.get('/personal', function(req, res) {
    personal.ver_personal().then(personal => {
        res.render('Personal/personal.ejs', { personal: personal});
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
        res.render('Personal/registrarpersonal.ejs', { especialidades, ocupaciones, error: null });
    } catch (error) {
        console.error('Error al obtener datos para registrar personal:', error);
        res.status(500).send('Error al obtener datos para registrar personal');
    }
});

router.post('/registrarpersonal', async function(req, res) {
    const { nombre, apellido, cedula, edad, genero_id, ocupacion_id, especialidad_id, email } = req.body;
    if (!nombre || !apellido || !cedula || !edad || !genero_id || !ocupacion_id || !especialidad_id || !email) {
        return res.status(500).send('Todos los campos son obligatorios');
    }
    try {
        const emailExiste = await modelo.existeEmail(email);
        if(!emailExiste){
            const especialidades = await personal.obtener_especialidades();
            const ocupaciones = await personal.obtener_ocupaciones();
            return res.render('Personal/registrarpersonal.ejs', { especialidades, ocupaciones, error: 'registre un usuario primero' });
        } else {
            personal.agregar_personal(nombre, apellido, cedula, edad, genero_id, ocupacion_id, especialidad_id).then(() => {
            res.redirect('/personal');
        })
        }
    } catch(error) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('La cédula ya está registrada');
        }
        const especialidades = await personal.obtener_especialidades();
        const ocupaciones = await personal.obtener_ocupaciones();
        res.render('Personal/registrarpersonal.ejs', { especialidades, ocupaciones, error: 'Error al agregar personal' });
    };
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