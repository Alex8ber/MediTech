const conexion = require("../db")
module.exports = {
    insertar(user,email,pass){
        console.log("insertar",user,pass);
        return new Promise((resolve, reject) => {
            conexion.query(`insert into proyecto1.usuario (Username,Email,Password) values (?,?,?)`,
            [user,email,pass], (error, resultados)=>{
                if(error) reject(error);
                else resolve(resultados);
            })
        })
    },
    
    existeEmail(email) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT * FROM proyecto1.usuario WHERE Email = ?`,
                [email],
                (error, resultados) => {
                    if (error) reject(error);
                    else resolve(resultados.length > 0);
                }
            );
        });
    },

    existeUser(user) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT * FROM proyecto1.usuario WHERE Username = ?`,
                [user],
                (error, resultados) => {
                    if (error) reject(error);
                    else resolve(resultados.length > 0);
                }
            );
        });
    }
};
    // ...existing code...

/*
    existe(user,email,pass){
        console.log("paso 1");
        return new Promise((resolve, reject) => {
            conexion.query(`select usuario.Username, usuario.Email, usuario.Password from proyecto1.usuario where usuario.Username = ?`,
            [user,email,pass], (error, resultados)=>{ 
                if(resultados.length){
                    if(error){ 
                        console.log("paso 2 error");
                        reject(error);
                    }else{
                        console.log("paso 2 resultados");
                        resolve(resultados[0]);
                    }
                }else{
                    console.log("paso 2");
                    console.log(resultados);
                    resolve(resultados)
                }
            })
        })
    }

*/