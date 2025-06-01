const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pacientes.ejs')
})


module.exports = router