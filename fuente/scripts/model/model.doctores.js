const conexion = require('../db');
const doctores = {
    ver_doctores() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT 
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
                LEFT JOIN Usuario ON Personal.Usuario_ID = Usuario.Id
                LEFT JOIN Tipo_Usuario ON Usuario.Tipo_usuario_ID = Tipo_Usuario.Id
                LEFT JOIN Especialidad ON Personal.Especialidad_ID = Especialidad.Id
                WHERE Usuario.Tipo_usuario_ID = 2`,
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },

    buscar_doctores(filtro) {
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
                WHERE Usuario.Tipo_usuario_ID = 2
                  AND (
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
module.exports = doctores;