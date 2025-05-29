const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/login', function(req, res) {
    res.render('login.ejs')
})

module.exports = router