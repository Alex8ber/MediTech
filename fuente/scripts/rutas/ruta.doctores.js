const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/doctores', function(req, res) {
    res.render('doctores.ejs')
})

module.exports = router