
const conexion = require("../db")
module.exports = {
    insertar(user,pass){
        console.log("insertar",user,pass);
        return new Promise((resolve, reject) => {
            conexion.query(`insert into proyecto1.usuarios (Usuario,password) values (?,?)`,
            [user,pass], async(error, resultados)=>{
                if(error) reject(error);
                else resolve(resultados);
            })
        })
    },
    existe(user,pass){
        console.log(user,pass);
        return new Promise((resolve, reject) => {
            conexion.query(`select usuarios.Usuario, usuarios.password from proyecto1.usuarios where Usuario = ?`,
            [user], async(error, resultados)=>{ 
                if(resultados.length > 0){
                    if(error) reject(error);
                    else resolve(resultados[0]);
                }else{resolve(resultados)}
            })
        })
    }
}