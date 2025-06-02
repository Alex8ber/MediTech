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
