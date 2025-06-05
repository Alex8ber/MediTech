const conexion = require("../db")
module.exports = {
    insertar(user, email, pass, tipoUsuarioId = 2) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `INSERT INTO Usuario (Nombre, Email, Contrasena, Tipo_usuario_ID) VALUES (?, ?, ?, ?)`,
                [user, email, pass, tipoUsuarioId],
                (error, resultados) => {
                    if (error) reject(error);
                    else resolve(resultados);
                }
            );
        });
    },

    existeEmail(email) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT Id FROM Usuario WHERE Email = ?`,
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
                `SELECT * FROM Usuario WHERE Nombre = ?`,
                [user],
                (error, resultados) => {
                    if (error) reject(error);
                    else resolve(resultados.length > 0);
                }
            );
        });
    }
};
