const conexion = require("../db")
module.exports = {
    insertar(user, email, pass, tipoUsuarioId = 2) { // tipoUsuarioId por defecto: 2 (Doctor)
        return new Promise((resolve, reject) => {
            // Primero insertamos el email en la tabla Email
            conexion.query(
                `INSERT INTO Email (Direccion) VALUES (?)`,
                [email],
                (error, emailResult) => {
                    if (error) return reject(error);
                    const emailId = emailResult.insertId;
                    // Ahora insertamos el usuario con el ID del email
                    conexion.query(
                        `INSERT INTO Usuario (Nombre, Email_ID, Contrasena, Tipo_usuario_ID) VALUES (?, ?, ?, ?)`,
                        [user, emailId, pass, tipoUsuarioId],
                        (error, resultados) => {
                            if (error) reject(error);
                            else resolve(resultados);
                        }
                    );
                }
            );
        });
    },

    existeEmail(email) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT Usuario.Id FROM Usuario INNER JOIN Email ON Usuario.Email_ID = Email.Id WHERE Email.Direccion = ?`,
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
