const express = require('express');
const bcryptjs = require('bcryptjs');
const conexion = require("../db");
const router = express.Router();
const modelo = require('../model/model.login');

/* GET home page. */
router.get('/login', function(req, res) {
    res.render('login.ejs')
})

router.post('/login', async function(req, res) {
    const { user, pass } = req.body;
    if (user && pass) {
        try {
            const usuario = await modelo.userExiste(user, pass);
            if (!usuario) {
                return res.render('login.ejs', { error: 'Usuario o Contraseña incorrectos' });
            }
            // aquí se agregan las cookies de sesión
            res.redirect('/home');
        } catch (error) {
            res.send(error);
        }
    } else {
        res.render('login.ejs', { error: 'Por favor, ingrese usuario y contraseña' });
    }
});

module.exports = router