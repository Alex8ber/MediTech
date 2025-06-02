const express = require('express')
const router = express.Router()

router.get('/registrardoctor', (req, res) => {
    res.render('registrardoctor.ejs')
})


module.exports = router