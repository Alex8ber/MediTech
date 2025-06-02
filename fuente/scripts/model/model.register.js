const conexion = require("../db")
module.exports = {
    insertar(user,pass){
        console.log("insertar",user,pass);
        return new Promise((resolve, reject) => {
            conexion.query(`insert into proyecto1.usuario (Username,password) values (?,?)`,
            [user,pass], async(error, resultados)=>{
                if(error) reject(error);
                else resolve(resultados);
            })
        })
    },
    existe(user,pass){
        console.log(user,pass);
        return new Promise((resolve, reject) => {
            conexion.query(`select usuario.Username, usuario.Email, usuario.password from proyecto1.usuario where usuario.Username = ?`,
            [user], (error, resultados)=>{ 
                if(resultados.length > 0){
                    if(error) reject(error);
                    else resolve(resultados[0]);
                }else{resolve(resultados)}
            })
        })
    }
}