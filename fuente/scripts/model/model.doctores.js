const conexion = require('../db');
const doctores = {
    ver_doctores() {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT medico.Nombre, medico.Apellido, medico.Cedula, medico.Edad, especialidad.Especialidad AS Especialidad, Usuario.Email FROM medico JOIN especialidad ON medico.EspecialidadID = especialidad.EspecialidadID JOIN usuario ON medico.UsuarioID = usuario.UsuarioID', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

    buscar_doctores(filtro) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT medico.Nombre, medico.Apellido, medico.Cedula, medico.Edad, especialidad.Especialidad AS Especialidad, Usuario.Email FROM medico JOIN especialidad ON medico.EspecialidadID = especialidad.EspecialidadID JOIN usuario ON medico.UsuarioID = usuario.UsuarioID WHERE medico.Nombre LIKE ? OR medico.Apellido LIKE ? OR especialidad.Especialidad LIKE ? OR Usuario.Email LIKE ?';
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