const conexion = require('../db');
const historial = {
    ver_historial() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT Pacientes.Nombres, Pacientes.Apellidos, Pacientes.Cedula From Pacientes`,
                (error, resultados) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(resultados);
                    }
                }
            );
        });
    },

    obtenerPacientePorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT Pacientes.Nombres, Pacientes.Apellidos, Pacientes.Cedula, (SELECT Numero FROM Telefono_Paciente WHERE Paciente_ID = Pacientes.ID LIMIT 1) AS Telefono, Pacientes.Edad, Patologia.Nombre AS Patologia, Genero.Tipo AS Genero FROM Pacientes JOIN Genero ON Pacientes.Genero_ID = Genero.Id JOIN Patologia ON Pacientes.Patologia_ID = Patologia.Id WHERE Pacientes.id = ?`, [id],
                (error, resultados) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(resultados[0]);
                    }
                }
            );
        });
    }
};


module.exports= historial;