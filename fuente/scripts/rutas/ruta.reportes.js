const express = require('express');
const router = express.Router();
// const modelo = require('../model/model.reportes');

router.get('/reportes', function(req, res) {
    res.render('reportes.ejs')
});
module.exports = router