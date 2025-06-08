const conexion = require("../db");
module.exports = {
  userExiste(user) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `SELECT Usuario.Nombre, Usuario.Contrasena FROM Usuario WHERE Usuario.Nombre = ?`,
        [user],
        (error, resultados) => {
          if (error) return reject(error);
          if (resultados.length === 0) {
            return resolve(false);
          }
          resolve(resultados[0]);
        }
      );
    });
  }
};