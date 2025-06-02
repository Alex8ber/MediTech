const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const modelo = require('../model/model.register');

/* GET home page. */
router.get('/register', function(req, res) {
    res.render('register.ejs', { error: null, title: 'Registro' });
});

router.post('/register', async function(req, res) {
    const {user, email, pass, confirm} = req.body;
    if(!user || !email || !pass || !confirm){
        return res.render('register.ejs', {error: 'Todos los campos son obligatorios'});
    }
    if(pass.length < 8){
        return res.render('register.ejs', {error: 'La contraseña debe ser mayor a 8 caracteres'});
    }
    if(pass !== confirm){
        return res.render('register.ejs', {error: 'Las contraseñas no coinciden'});
    }
    try {
        // Verificar si el usuario o el email ya existen
        const emailExiste = await modelo.existeEmail(email);
        const userExiste = await modelo.existeUser(user);
        if(userExiste){
            return res.render('register.ejs', {error: 'El usuario ya está en uso'});
        }else if(emailExiste){
            return res.render('register.ejs', {error: 'El correo ya está en uso'});
        }else {
            // Encriptar la contraseña antes de mandarla
            const hash = await bcryptjs.hash(pass, 12);
            await modelo.insertar(user, email, hash);
            res.redirect('/');
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router