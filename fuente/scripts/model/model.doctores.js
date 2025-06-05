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
                    Especialidad.Descripcion AS Especialidad, 
                    Email.Direccion AS Email
                FROM Personal
                LEFT JOIN Especialidad ON Personal.Especialidad_ID = Especialidad.Id
                LEFT JOIN Usuario ON Personal.Usuario_ID = Usuario.Id
                LEFT JOIN Email ON Usuario.Email_ID = Email.Id`,
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
            const query = `
                SELECT 
                    Personal.Nombres AS Nombre, 
                    Personal.Apellidos AS Apellido, 
                    Personal.Cedula, 
                    Personal.Edad, 
                    Especialidad.Descripcion AS Especialidad, 
                    Email.Direccion AS Email
                FROM Personal
                LEFT JOIN Especialidad ON Personal.Especialidad_ID = Especialidad.Id
                LEFT JOIN Usuario ON Personal.Usuario_ID = Usuario.Id
                LEFT JOIN Email ON Usuario.Email_ID = Email.Id
                WHERE Personal.Nombres LIKE ? OR Personal.Apellidos LIKE ? OR Especialidad.Descripcion LIKE ? OR Email.Direccion LIKE ?
            `;
            const values = [`%${filtro}%`, `%${filtro}%`, `%${filtro}%`, `%${filtro}%`];
            conexion.query(query, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
}
module.exports = doctores;