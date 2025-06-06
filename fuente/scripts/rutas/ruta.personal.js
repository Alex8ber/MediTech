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
        res.json(personal); // Devuelve los resultados en JSON
    })
    .catch(err => {
        return res.status(500).send('Error al buscar personal: ' + err.message);
    })
});

router.get('/registrarpersonal', function(req, res) {
    personal.obtener_especialidades().then(especialidades => {
        res.render('Personal/registrarpersonal.ejs', { especialidades });
    }).catch(err => {
        res.status(500).send('Error al obtener especialidades: ' + err.message);
    });
})


module.exports = router