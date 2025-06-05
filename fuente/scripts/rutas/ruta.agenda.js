const express = require('express')
const router = express.Router()

router.get('/agenda', function (req, res) {
    res.render('agenda.ejs')
})

router.get('/citas' , function (req, res) {
    res.render('citas.ejs')
})

module.exports = router