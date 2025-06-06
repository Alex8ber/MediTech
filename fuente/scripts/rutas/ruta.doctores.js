const express = require('express')
const router = express.Router();
const doctores = require('../model/model.doctores')

router.get('/doctores', function(req, res) {
    doctores.ver_doctores().then(doctores => {
        res.render('Doctores/doctores.ejs', { doctores: doctores });
    })
    .catch(err => {
        return res.status(500).send('Error al obtener los doctores: ' + err.message);
    })
})

router.get('/buscar-doctores', function(req, res) {
    const filtro = req.query.q || '';
    doctores.buscar_doctores(filtro).then(doctores => {
        res.json(doctores); // Devuelve los resultados en JSON
    })
    .catch(err => {
        return res.status(500).send('Error al buscar doctores: ' + err.message);
    })
});

router.get('/registrardoctor', function(req, res) {
    doctores.obtener_especialidades().then(especialidades => {
        res.render('Doctores/registrardoctor.ejs', { especialidades });
    }).catch(err => {
        res.status(500).send('Error al obtener especialidades: ' + err.message);
    });
})


module.exports = router