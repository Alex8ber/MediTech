const conexion = require('../db');
const personal = {
    ver_personal() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT 
                    Personal.Nombres AS Nombre, 
                    Personal.Apellidos AS Apellido, 
                    Personal.Cedula, 
                    Personal.Edad, 
                    Especialidad.Descripcion AS Especialidad, 
                    Usuario.Email AS Email
                FROM Personal
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

    obtener_especialidades() {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT Id, Descripcion FROM Especialidad', (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
}
module.exports = personal;