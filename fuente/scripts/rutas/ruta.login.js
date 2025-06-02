const express = require('express');
const bcryptjs = require('bcryptjs');
const conexion = require("../db");
const router = express.Router();
const modelo = require('../model/model.login');

/* GET home page. */
router.get('/login', function(req, res) {
    res.render('login.ejs')
})

router.post('/login', (req,res) =>{
    const user = req.body.email;
    const pass = req.body.pass;
    if(user && pass){
        conexion.query(`SELECT usuarios.Usuario,usuarios.password FROM usuarios WHERE usuarios.Usuario = ? AND usuarios.password = ?`,
        [user,pass], (error, resultados)=>{
            if(resultados.length == 0 || resultados[0].password != pass){
                res.render('/login', {error: 'Usuario o contraseña incorrectos'});
            }else{
                res.redirect('/home');
            }
        })
    }
});

module.exports = router