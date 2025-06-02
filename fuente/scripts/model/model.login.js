const { resolveInclude } = require("ejs");
const conexion = require("../db");
const bcryptjs = require('bcryptjs');
module.exports = {
    existe(user,pass){conexion.query(`select usuarios.Username,usuarios.Password from usuarios where usuarios.Username = ? and usuarios.Password = ?`),
    [user,pass], (error, resultados)=>{ 
      if(resultados.length == 0 || resultados[0].password != pass){
        reject('Usuario o Contraseña incorrectos');
      }else{
        resolve(resultados);
      }
    }
    }
}