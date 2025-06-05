const conexion = require('../db');
const paciente = {
    ver_paciente() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT 
                    Pacientes.Nombres, 
                    Pacientes.Apellidos, 
                    Pacientes.Cedula, 
                    Pacientes.Edad, 
                    Genero.Tipo AS Genero, 
                    Patologia.Nombre AS Patologia, 
                    Pacientes.Direccion, 
                    Pacientes.Email_ID, 
                    Pacientes.Telefono_ID
                FROM Pacientes
                LEFT JOIN Patologia ON Pacientes.Patologia_ID = Patologia.Id
                LEFT JOIN Genero ON Pacientes.Genero_ID = Genero.Id`,
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
                    Pacientes.Nombres,
                    Pacientes.Apellidos, 
                    Pacientes.Cedula, 
                    Pacientes.Edad, 
                    Genero.Tipo AS Genero, 
                    Patologia.Nombre AS Patologia, 
                    Pacientes.Direccion, 
                    Pacientes.Email_ID, 
                    Pacientes.Telefono_ID
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

    agregar_paciente(nombres, apellidos, cedula, telefono, edad, patologia, genero, email, direccion) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `INSERT INTO Pacientes 
                    (Nombres, 
                    Apellidos, 
                    Cedula, 
                    Edad, 
                    Genero_ID, 
                    Telefono_ID, 
                    Email_ID, 
                    Patologia_ID, 
                    Direccion)
                 VALUES (?, ?, ?, ?, (SELECT Id FROM Genero WHERE Tipo = ?), (SELECT Id FROM Telefono WHERE Numero = ?), (SELECT Id FROM Email WHERE Direccion = ?), (SELECT Id FROM Patologia WHERE Nombre = ?), ?)`,
                [nombres, apellidos, cedula, edad, genero, telefono, email, patologia, direccion],
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