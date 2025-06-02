const { resolveInclude } = require("ejs");
const conexion = require("../db");
module.exports = {
  userExiste(user, pass) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `SELECT usuario.Username, usuario.password FROM usuario WHERE usuario.Username = ?`,
        [user],
        (error, resultados) => {
          if (error) return reject(error);
          if (resultados.length === 0) {
            console.log("resolvió falso");
            return resolve(false);
          }
          resolve(resultados[0]);
        }
      );
    });
  }
}