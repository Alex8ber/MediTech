const conexion = require('../db');
const doctores = {
    ver_doctores() {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT medico.Nombre, medico.Apellido, medico.Cedula, medico.Edad, especialidad.Especialidad AS Especialidad, medico.Email FROM medico JOIN especialidad ON medico.EspecialidadID = especialidad.EspecialidadID', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

    buscar_doctores(filtro) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT medico.Nombre, medico.Apellido, medico.Cedula, medico.Edad, especialidad.Especialidad AS Especialidad, medico.Email FROM medico JOIN especialidad ON medico.EspecialidadID = especialidad.EspecialidadID WHERE medico.Nombre LIKE ? OR medico.Apellido LIKE ? OR especialidad.Especialidad LIKE ?';
            const values = [`%${filtro}%`, `%${filtro}%`, `%${filtro}%`];
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