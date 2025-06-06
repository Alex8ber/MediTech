const express = require('express')
const router = express.Router()


router.get('/historialmedico', (req, res) => {
    res.render('historial/historialmedico.ejs');
});

router.get('/registrarhistorial', (req, res) => {
    res.render('historial/registrarhistorial.ejs');
});

module.exports = router;