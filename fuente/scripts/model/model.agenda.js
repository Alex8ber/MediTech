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
    },

    obtenerProximasCitas() {
        return new Promise((resolve, reject) => {
            const hoy = new Date();
            const fechaActual = hoy.toISOString().slice(0, 19).replace('T', ' ');
            const sql = `
                SELECT 
                    Citas.Fecha,
                    DATE_FORMAT(Citas.Fecha, '%H:%i') AS Hora,
                    Pacientes.Nombres,
                    Pacientes.Apellidos,
                    Citas.Observaciones
                FROM Citas
                JOIN Pacientes ON Citas.Paciente_ID = Pacientes.Id
                WHERE Citas.Fecha >= ?
                ORDER BY Citas.Fecha ASC
            `;
            conexion.query(sql, [fechaActual], (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    },

    obtenerTodasLasCitas() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    Citas.Fecha,
                    DATE_FORMAT(Citas.Fecha, '%H:%i') AS Hora,
                    Pacientes.Nombres,
                    Pacientes.Apellidos,
                    Citas.Observaciones,
                    CONCAT(Personal.Nombres, ' ', Personal.Apellidos) AS Doctor
                FROM Citas
                JOIN Pacientes ON Citas.Paciente_ID = Pacientes.Id
                JOIN Personal ON Citas.Personal_ID = Personal.Id
                ORDER BY Citas.Fecha DESC
            `;
            conexion.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    },

    obtenerCitasHoy() {
        return new Promise((resolve, reject) => {
            const hoy = new Date();
            const inicio = hoy.toISOString().slice(0, 10) + ' 00:00:00';
            const fin = hoy.toISOString().slice(0, 10) + ' 23:59:59';
            const sql = `
                SELECT 
                    Citas.Fecha,
                    DATE_FORMAT(Citas.Fecha, '%H:%i') AS Hora,
                    Pacientes.Nombres,
                    Pacientes.Apellidos,
                    Citas.Observaciones
                FROM Citas
                JOIN Pacientes ON Citas.Paciente_ID = Pacientes.Id
                WHERE Citas.Fecha BETWEEN ? AND ?
                ORDER BY Citas.Fecha ASC
            `;
            conexion.query(sql, [inicio, fin], (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    },

    obtenerCitasSemana() {
        return new Promise((resolve, reject) => {
            const hoy = new Date();
            const inicio = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 1)); // Lunes
            const fin = new Date(inicio);
            fin.setDate(inicio.getDate() + 6); // Domingo
            const inicioStr = inicio.toISOString().slice(0, 10) + ' 00:00:00';
            const finStr = fin.toISOString().slice(0, 10) + ' 23:59:59';
            const sql = `
                SELECT 
                    Citas.Fecha,
                    DATE_FORMAT(Citas.Fecha, '%H:%i') AS Hora,
                    Pacientes.Nombres,
                    Pacientes.Apellidos,
                    Citas.Observaciones
                FROM Citas
                JOIN Pacientes ON Citas.Paciente_ID = Pacientes.Id
                WHERE Citas.Fecha BETWEEN ? AND ?
                ORDER BY Citas.Fecha ASC
            `;
            conexion.query(sql, [inicioStr, finStr], (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    },

    obtenerCitasMes() {
        return new Promise((resolve, reject) => {
            const hoy = new Date();
            const inicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
            const fin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
            const inicioStr = inicio.toISOString().slice(0, 10) + ' 00:00:00';
            const finStr = fin.toISOString().slice(0, 10) + ' 23:59:59';
            const sql = `
                SELECT 
                    Citas.Fecha,
                    DATE_FORMAT(Citas.Fecha, '%H:%i') AS Hora,
                    Pacientes.Nombres,
                    Pacientes.Apellidos,
                    Citas.Observaciones
                FROM Citas
                JOIN Pacientes ON Citas.Paciente_ID = Pacientes.Id
                WHERE Citas.Fecha BETWEEN ? AND ?
                ORDER BY Citas.Fecha ASC
            `;
            conexion.query(sql, [inicioStr, finStr], (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    },
};

module.exports = agenda;