const express = require('express')
const router = express.Router();
const doctores = require('../model/model.doctores')
/* GET home page. */
router.get('/doctores', function(req, res) {
    doctores.ver_doctores().then(doctores => {
        res.render('doctores.ejs', { doctores: doctores });
    })
    .catch(err => {
        return res.status(500).send('Error al obtener los doctores: ' + err.message);
    })
})



module.exports = router