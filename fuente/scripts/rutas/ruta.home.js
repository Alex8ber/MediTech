const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/home', function(req, res) {
    res.render('homepage.ejs')
})

module.exports = router