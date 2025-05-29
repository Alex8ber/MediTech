const conexion = require("../db")
module.exports = {
    insertar(nombre,apellido,user,pass){
        return new Promise((resolve, reject) => {
            conexion.query(`insert into users (nombre,apellido,user,pass,tipoU_id) values (?,?,?,?,2)`,
            [nombre,apellido,user,pass], async(error, resultados)=>{
                if(error) reject(error);
                else resolve(resultados);
            })
        })
    },
    existe(user){
        return new Promise((resolve, reject) => {
            conexion.query(`select users.user from users where user = ?`,
            [user], async(error, resultados)=>{
                if(resultados.length > 0){
                    if(error) reject(error);
                    else resolve(resultados[0]);
                }else{resolve(resultados)}
            })
        })
    }
}