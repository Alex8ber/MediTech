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
                    genero.Tipo AS Genero,
                    Ocupacion.Nombre AS Ocupacion,
                    Especialidad.Descripcion AS Especialidad, 
                    Usuario.Email AS Email
                FROM Personal
                LEFT JOIN Genero ON Personal.Genero_ID = Genero.Id
                LEFT JOIN Ocupacion ON Personal.Ocupacion_ID = Ocupacion.Id
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
                    Especialidad.Descripcion AS Especialidad, 
                    Usuario.Email AS Email
                FROM Personal
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

    agregar_personal (nombre, apellido, cedula, edad, genero_id, ocupacion_id, especialidad_id) {
        return new Promise((resolve, reject) => {
            conexion.query(`INSERT INTO Personal (Nombres, Apellidos, Cedula, Edad, Genero_ID, Ocupacion_ID, Especialidad_ID) VALUES (?, ?, ?, ?, ?, ?, ?)`, [nombre, apellido, cedula, edad, genero_id, ocupacion_id, especialidad_id], (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados);
            });
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
            conexion.query('SELECT Id, Nombre FROM Ocupacion', (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },

    eliminar_personal(id){
        return new Promise((resolve, reject) => {
            conexion.query('DELETE FROM Personal WHERE Id = ?', [id], (error, resultados) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(resultados);
                }
            });
        });
    }
};
module.exports = personal;