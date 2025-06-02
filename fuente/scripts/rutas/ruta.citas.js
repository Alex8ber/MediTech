const express = require('express')
const router = express.Router()

router.get('/citas', (req, res) => {
    res.render('citas.ejs')
})


module.exports = router