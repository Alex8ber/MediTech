const conexion = require('../db');
const paciente = {
    ver_paciente() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT
                    Pacientes.Id,
                    Pacientes.Nombres AS Nombre, 
                    Pacientes.Apellidos AS Apellido, 
                    Pacientes.Cedula, 
                    Pacientes.Edad, 
                    Genero.Tipo AS Genero, 
                    Patologia.Nombre AS Patologia, 
                    Pacientes.Direccion, 
                    Pacientes.Email, 
                    Pacientes.Ocupacion,
                    Estado_civil.Estado AS "Estado Civil",
                    Condicion.Descripcion AS Condicion,
                    Tipo_de_Sangre.Tipo AS "Tipo de Sangre",
                    (SELECT Numero FROM Telefono_Paciente WHERE Paciente_ID = Pacientes.Id LIMIT 1) AS Telefono
                FROM Pacientes
                LEFT JOIN Patologia ON Pacientes.Patologia_ID = Patologia.Id
                LEFT JOIN Genero ON Pacientes.Genero_ID = Genero.Id
                LEFT JOIN Estado_civil ON Pacientes.Estado_Civil_ID = Estado_civil.Id
                LEFT JOIN Condicion ON Pacientes.Condicion_ID = Condicion.Id
                LEFT JOIN Tipo_de_Sangre ON Pacientes.Tipo_de_sangre_ID = Tipo_de_Sangre.Id`,
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

    buscar_paciente(filtro, patologia) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT 
                    Pacientes.Nombres AS Nombre,
                    Pacientes.Apellidos AS Apellido, 
                    Pacientes.Cedula, 
                    Pacientes.Edad, 
                    Genero.Tipo AS Genero, 
                    Patologia.Nombre AS Patologia, 
                    Pacientes.Direccion, 
                    Pacientes.Email, 
                    (SELECT Numero FROM Telefono_Paciente WHERE Paciente_ID = Pacientes.Id LIMIT 1) AS Telefono
                FROM Pacientes
                LEFT JOIN Patologia ON Pacientes.Patologia_ID = Patologia.Id
                LEFT JOIN Genero ON Pacientes.Genero_ID = Genero.Id
                WHERE (Pacientes.Nombres LIKE ? OR Pacientes.Apellidos LIKE ? OR Pacientes.Cedula LIKE ?)
            `;
            const values = [`%${filtro}%`, `%${filtro}%`, `%${filtro}%`];

            if (patologia) {
                query += ' AND Patologia.Nombre LIKE ?';
                values.push(`%${patologia}%`);
            }

            conexion.query(query, values, (error, resultados) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(resultados);
                }
            });
        });
    },

    agregar_paciente(nombres, apellidos, cedula, telefono, edad, patologia, genero, email, direccion, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id) {
        return new Promise((resolve, reject) => {
            // Insertar paciente
            conexion.query(
                `INSERT INTO Pacientes 
                    (Nombres, Apellidos, Cedula, Edad, Genero_ID, Email, Direccion, Ocupacion, Estado_Civil_ID, Patologia_ID, Condicion_ID, Tipo_de_sangre_ID)
                 VALUES (?, ?, ?, ?, (SELECT Id FROM Genero WHERE Tipo = ?), ?, ?, ?, ?, (SELECT Id FROM Patologia WHERE Nombre = ?), ?, ?)`,
                [nombres, apellidos, cedula, edad, genero, email, direccion, ocupacion, estado_civil_id, patologia, condicion_id, tipo_de_sangre_id],
                (error, resultados) => {
                    if (error) {
                        reject(error);
                    } else {
                        // Insertar teléfono si es necesario
                        const pacienteId = resultados.insertId;
                        conexion.query(
                            `INSERT INTO Telefono_Paciente (Paciente_ID, Numero) VALUES (?, ?)`,
                            [pacienteId, telefono],
                            (telError) => {
                                if (telError) reject(telError);
                                else resolve(resultados);
                            }
                        );
                    }
                }
            );
        });
    }
};

module.exports = paciente;