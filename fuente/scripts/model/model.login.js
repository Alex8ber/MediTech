const conexion = require("../db");
module.exports = {
  userExiste(email) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `SELECT Usuario.Nombre, Usuario.Contrasena FROM Usuario WHERE Usuario.Email = ?`,
        [email],
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