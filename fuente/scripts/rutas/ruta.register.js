const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/register', function(req, res) {
    res.render('register.ejs')
})

module.exports = router