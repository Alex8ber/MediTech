const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const modelo = require('../model/model.register');

/* GET home page. */
router.get('/register', function(req, res) {
    res.render('register.ejs', { error: null, title: 'Registro' });
});

router.post('/register', async function(req, res) {

const {email, pass, confirm} = req.body;
    if(!email || !pass || !confirm){
        res.render('registro', {error: 'Todos los campos son obligatorios'});
    }else if(pass.length < 8){
        res.render('registro', {error: 'La contraseña debe ser mayor a 8 caracteres'});
    }else if(await modelo.existe(email) > [0]){
        res.render('registro', {error: 'El usuario ya existe'});
    }else{
    modelo.insertar(email, pass) 
        .then(() => {
        res.redirect('/');
    }).catch(error => {
        res.send(error);
    });
    }
});
module.exports = router