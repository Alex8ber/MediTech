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
    console.log(user,pass);
    if(user && pass){
        conexion.query(`select usuarios.Usuario,usuarios.password from proyecto1.usuarios where usuarios.Usuario = ? and usuarios.password = ?`),
        [user,pass], (error, resultados)=>{
            console.log(resultados);
            if(resultados.length == 0 || resultados[0].password != pass){
                res.render('/login', {error: 'Usuario o contraseña incorrectos'});
            }else{
                console.log(resultados)
                res.redirect('/register');
            }
        }   
    }
});

module.exports = router