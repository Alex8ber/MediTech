const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const modelo = require('../model/model.register');

/* GET home page. */
router.get('/register', function(req, res) {
    res.render('register.ejs', { error: null, title: 'Registro' });
});

router.post('/register', function(req, res) {

const {user, email, pass, confirm} = req.body;
    if(!user || !email || !pass || !confirm){
        res.render('register.ejs', {error: 'Todos los campos son obligatorios'});
    }else if(pass.length < 8){
        res.render('register.ejs', {error: 'La contraseña debe ser mayor a 8 caracteres'});
    }else if(modelo.existe(email) > [0]){
        res.render('register.ejs', {error: 'El correo ya está en uso'});
    }else if(modelo.existe(user) > [0]){
        res.render('register.ejs', {error: 'El usuario ya está en uso'});
    }else{
    modelo.insertar(user, email, pass) 
        .then(() => {
        res.redirect('/');
    }).catch(error => {
        res.send(error);
    });
    }
});
module.exports = router