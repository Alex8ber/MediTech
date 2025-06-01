const { resolveInclude } = require("ejs");
const conexion = require("../db");
const bcryptjs = require('bcryptjs');
module.exports = {
    existe(user,pass){conexion.query(`select usuarios.Usuario,usuarios.password from Usuario where usuarios.Usuario = ? and usuarios.password = ?`),
    [user,pass], (error, resultados)=>{ 
      if(resultados.length == 0 || resultados[0].password != pass){
        reject('Usuario o contraseña incorrectos');
      }else{
        resolve(resultados);
      }
    }
    }
}