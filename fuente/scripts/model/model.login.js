const { resolveInclude } = require("ejs");
const conexion = require("../db");

module.exports = {
  userExiste(user, pass) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `SELECT usuario.Username FROM usuario WHERE usuario.Username = ? AND usuario.password = ?`,
        [user, pass],
        (error, resultados) => {
          if (error) return reject(error);
          if (resultados.length === 0) return resolve(false);
          resolve(resultados[0]);
        }
      );
    });
  }
}