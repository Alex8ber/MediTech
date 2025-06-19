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
                Tipo_de_Sangre.Tipo AS "Tipo de Sangre", 
                Pacientes.Direccion AS Direccion
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
    },

    ver_examen_fisico(id) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT
                Examen_Fisico.Id AS id,
                Examen_Fisico.Paciente_ID,
                Examen_Fisico.Peso,
                Examen_Fisico.Altura,
                Examen_Fisico.Presion_Arterial AS Presion,
                Examen_Fisico.Frecuencia_Cardiaca AS Frecuencia,
                Examen_Fisico.Frecuencia_Respiratoria AS Respiratoria,
                Examen_Fisico.IMC,
                Examen_Fisico.Alergias
            FROM Examen_Fisico
            WHERE Paciente_ID = ?`, [id],
                (error, resultados) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(resultados);
                    }
                }
            )
        });
    },

    actualizar_examen_fisico(id, peso, altura, presion_arterial, frecuencia_cardiaca, frecuencia_respiratoria, imc, alergias) {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE Examen_Fisico
            SET Peso = ?, Altura = ?, Presion_Arterial = ?, Frecuencia_Cardiaca = ?, Frecuencia_Respiratoria = ?, IMC = ?, Alergias = ?
            WHERE Paciente_ID = ?
        `;
        conexion.query(sql, [peso, altura, presion_arterial, frecuencia_cardiaca, frecuencia_respiratoria, imc, alergias, id], (error, resultados) => {
            if (error) reject(error);
            else resolve(resultados);
            });
        });
    }


};


module.exports= historial;