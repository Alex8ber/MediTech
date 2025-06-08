const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const modelo = require('../model/model.login');

router.get('/login', function(req, res) {
    res.render('login.ejs')
})

router.post('/login', async function(req, res) {
    const { email, pass } = req.body;
    if (email && pass) {
        try {
            const usuario = await modelo.userExiste(email);
            if (!usuario) {
                console.log('Usuario no encontrado');
                return res.render('login.ejs', { error: 'Usuario o Contraseña incorrectos' });
            }
            const passwordValida = await bcryptjs.compare(pass, usuario.Contrasena);
            if (!passwordValida) {
                console.log('Contraseña no válida');
                return res.render('login.ejs', { error: 'Usuario o Contraseña incorrectos' });
            } else {
                res.redirect('/home');
            }
        } catch (error) {
            res.render('login.ejs', { error: error.message });
        }
    } else {
        res.render('login.ejs', { error: 'Por favor, ingrese usuario y contraseña' });
    }
});

module.exports = router