const express = require('express')
const router = express.Router()

router.get('/personal', (req, res) => {
    res.render('Personal/personalobrero.ejs')
})

router.get('/registrarpersonal', (req, res) => {
    res.render('Personal/registrarpersonal.ejs');
});

module.exports = router