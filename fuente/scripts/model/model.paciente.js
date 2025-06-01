const conexion = require('../db');
const paciente = {
    ver_paciente() {
        return new Promise((resolve, reject) => {
            conexion.query(
                'SELECT Nombre, Apellido, FechaNacimiento, Telefono, Direccion, Email FROM paciente',
                (error, resultados) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(resultados);
                    }
                }
            );
        });
    }
};

module.exports = paciente;