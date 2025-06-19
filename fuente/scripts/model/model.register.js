const conexion = require("../db")
module.exports = {
    insertar(user, email, pass, tipoUsuarioId) {
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
    },
    
    obtenerTiposUsuario() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT Id, Descripcion FROM Tipo_Usuario`,
                (error, resultados) => {
                    if (error) reject(error);
                    else resolve(resultados);
                }
            );
        });
    },

    obtenerGeneros() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT Id, Tipo FROM Genero`,
                (error, resultados) => {
                    if (error) reject(error);
                    else resolve(resultados);
                }
            );
        });
    },

    obtenerEstadosCiviles() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT Id, Estado FROM Estado_civil`,
                (error, resultados) => {
                    if (error) reject(error);
                    else resolve(resultados);
                }
            );
        });
    },

    obtenerEspecialidades() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT Id, Descripcion FROM Especialidad`,
                (error, resultados) => {
                    if (error) reject(error);
                    else resolve(resultados);
                }
            );
        });
    }
};
