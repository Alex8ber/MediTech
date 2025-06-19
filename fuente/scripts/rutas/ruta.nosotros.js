const express = require('express')
const router = express.Router()

router.get('/sobrenosotros', function(req, res) {
    res.render('sobrenosotros.ejs')
})

module.exports = router