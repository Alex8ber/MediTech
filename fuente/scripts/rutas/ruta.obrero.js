const express = require('express')
const router = express.Router()

router.get('/obreros', (req, res) => {
    res.render('personalobrero.ejs')
})

module.exports = router