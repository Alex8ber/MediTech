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
    }
}
module.exports = doctores;