const conexion = require('../db');
const personal = {
    ver_personal() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT 
                    Personal.Id AS id,
                    Personal.Nombres AS Nombre, 
                    Personal.Apellidos AS Apellido, 
                    Personal.Cedula, 
                    Personal.Edad,
                    Genero.Tipo AS Genero,
                    Tipo_Usuario.Descripcion AS Ocupacion,
                    Especialidad.Descripcion AS Especialidad, 
                    Usuario.Email AS Email
                FROM Personal
                LEFT JOIN Genero ON Personal.Genero_ID = Genero.Id
                LEFT JOIN Tipo_Usuario ON Personal.Tipo_usuario_ID = Tipo_Usuario.Id
                LEFT JOIN Especialidad ON Personal.Especialidad_ID = Especialidad.Id
                LEFT JOIN Usuario ON Personal.Usuario_ID = Usuario.Id`,
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },

    buscar_personal(filtro) {
        return new Promise((resolve, reject) => {
            const query = 
                `SELECT 
                    Personal.Id AS id,
                    Personal.Nombres AS Nombre, 
                    Personal.Apellidos AS Apellido, 
                    Personal.Cedula, 
                    Personal.Edad,
                    Genero.Tipo AS Genero,
                    Tipo_Usuario.Descripcion AS Ocupacion,
                    Especialidad.Descripcion AS Especialidad, 
                    Usuario.Email AS Email
                FROM Personal
                LEFT JOIN Genero ON Personal.Genero_ID = Genero.Id
                LEFT JOIN Tipo_Usuario ON Personal.Tipo_usuario_ID = Tipo_Usuario.Id
                LEFT JOIN Especialidad ON Personal.Especialidad_ID = Especialidad.Id
                LEFT JOIN Usuario ON Personal.Usuario_ID = Usuario.Id
                WHERE(
                    Personal.Nombres LIKE ? OR 
                    Personal.Apellidos LIKE ? OR 
                    Especialidad.Descripcion LIKE ? OR 
                    Usuario.Email LIKE ?
                )`;
            const values = [`%${filtro}%`, `%${filtro}%`, `%${filtro}%`, `%${filtro}%`];
            conexion.query(query, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

    agregar_personal (nombre, apellido, cedula, edad, genero_id, tipo_usuario_id, especialidad_id) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `INSERT INTO Personal (Nombres, Apellidos, Cedula, Edad, Genero_ID, Tipo_usuario_ID, Especialidad_ID) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [nombre, apellido, cedula, edad, genero_id, tipo_usuario_id, especialidad_id],
                (error, resultados) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(resultados);
                }
            );
        });
    },

    obtener_especialidades() {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT Id, Descripcion FROM Especialidad', (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },

    obtener_ocupaciones() {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT Id, Descripcion FROM Tipo_Usuario', (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },
    obtener_personal_por_id(id) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT 
                    Personal.Id,
                    Personal.Nombres,
                    Personal.Apellidos,
                    Personal.Cedula,
                    Personal.Edad,
                    Personal.Genero_ID,
                    Personal.Tipo_usuario_ID,
                    Personal.Especialidad_ID,
                    Usuario.Email
                FROM Personal
                LEFT JOIN Usuario ON Personal.Usuario_ID = Usuario.Id
                WHERE Personal.Id = ?`,
                [id],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results[0]);
                }
            );
        });
    },
    actualizar_personal(id, nombre, apellido, cedula, edad, genero_id, tipo_usuario_id, especialidad_id, email) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `UPDATE Personal SET Nombres=?, Apellidos=?, Cedula=?, Edad=?, Genero_ID=?, Tipo_usuario_ID=?, Especialidad_ID=? WHERE Id=?`,
                [nombre, apellido, cedula, edad, genero_id, tipo_usuario_id, especialidad_id, id],
                (error, resultados) => {
                    if (error) return reject(error);
                    // Actualizar email en Usuario si es necesario
                    if (email) {
                        conexion.query(
                            `UPDATE Usuario SET Email=? WHERE Id=(SELECT Usuario_ID FROM Personal WHERE Id=?)`,
                            [email, id],
                            (err) => {
                                if (err) return reject(err);
                                resolve(resultados);
                            }
                        );
                    } else {
                        resolve(resultados);
                    }
                }
            );
        });
    },
    eliminar_personal(id){
        return new Promise((resolve, reject) => {
            conexion.query('DELETE FROM Telefono_Personal WHERE Id = ?', [id], (error, resultados) => {
                if(error) {
                    reject(error);
                } else {
                    conexion.query( `DELETE FROM Personal WHERE Id = ?`, [id], (error, resultados) => {
                        if(error) {
                            reject(error);
                        } else {
                            conexion.query( `DELETE FROM Usuario WHERE Id = ?`, [id], (error, resultados) => {
                                if(error) {
                                    reject(error);
                                } else {
                                    resolve(resultados);
                                }
                            })
                        }
                    })
                }
            });
        });
    }
};
module.exports = personal;