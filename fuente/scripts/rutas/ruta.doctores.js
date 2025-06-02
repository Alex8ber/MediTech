const express = require('express')
const router = express.Router();
const doctores = require('../model/model.doctores')
/* GET home page. */
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


module.exports = router