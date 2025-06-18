const conexion = require('../db');

const agenda = {
    insertarCita({ pacienteId, personalId, observaciones, estadoId, fecha }) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `INSERT INTO Citas (Paciente_ID, Personal_ID, Observaciones, Estado_ID, Fecha) VALUES (?, ?, ?, ?, ?)`,
                [pacienteId, personalId, observaciones, estadoId, fecha],
                (error, resultados) => {
                    if (error) reject(error);
                    else resolve(resultados);
                }
            );
        });
    },
    obtenerPatologias() {
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT Id, Nombre FROM Patologia`, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    },
    obtenerEstado() {
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT Id, Descripcion FROM Estado`, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    },

    obtenerCitasPorPaciente(pacienteId) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `SELECT 
                Citas.Fecha, 
                Estado.Descripcion AS Estado, 
                CONCAT(personal.Nombres, ' ', personal.Apellidos) AS \`Medico asignado\`, 
                Citas.Observaciones 
            FROM Citas 
            JOIN estado ON Citas.Estado_ID = estado.Id 
            JOIN personal ON Citas.Personal_ID = personal.Id 
            WHERE Paciente_ID = ? 
            ORDER BY Fecha DESC`,
            [pacienteId],
            (error, resultados) => {
                if (error) reject(error);
                else resolve(resultados);
                }
            );
        });
    },

    obtenerEspecialidades() {
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT Id, Descripcion FROM Especialidad`, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
};

module.exports = agenda;