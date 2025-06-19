const conexion = require('../db');
const historial = {
    ver_historial() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT Pacientes.Id AS id, Pacientes.Nombres, Pacientes.Apellidos, Pacientes.Cedula From Pacientes`,
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
                `SELECT
                Pacientes.ID AS id, 
                Pacientes.Nombres, 
                Pacientes.Apellidos, 
                Pacientes.Cedula, 
                (SELECT Numero FROM Telefono_Paciente WHERE Paciente_ID = Pacientes.ID LIMIT 1) AS Telefono, 
                Pacientes.Edad,  
                Genero.Tipo AS Genero, 
                Pacientes.Patologia, 
                Pacientes.Email, Pacientes.Ocupacion, 
                Estado_civil.Estado AS "Estado Civil",
                Tipo_de_Sangre.Tipo AS "Tipo de sangre", 
                Pacientes.Direccion
                FROM Pacientes 
                LEFT JOIN Genero ON Pacientes.Genero_ID = Genero.Id  
                LEFT JOIN Estado_civil ON Pacientes.Estado_Civil_ID = Estado_civil.Id 
                LEFT JOIN Tipo_de_Sangre ON Pacientes.Tipo_de_sangre_ID = Tipo_de_Sangre.Id 
                WHERE Pacientes.id = ?`, [id],
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