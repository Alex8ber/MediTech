const conexion = require('../db');
const paciente = {
    ver_paciente() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT paciente.Nombre, paciente.Apellido, paciente.Cedula, paciente.Edad, Genero.Codigo AS Genero, patologia.Patologia, paciente.FechaNacimiento, paciente.Telefono, paciente.Direccion
                FROM paciente
                JOIN patologia ON paciente.PatologiaID = patologia.PatologiaID
                JOIN Genero ON paciente.GeneroID = Genero.GeneroID`,
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
            SELECT paciente.Nombre, paciente.Apellido, paciente.FechaNacimiento, paciente.Telefono, paciente.Direccion, paciente.Cedula, paciente.Edad, patologia.Patologia, Genero.Codigo AS Genero
            FROM paciente
            JOIN patologia ON paciente.PatologiaID = patologia.PatologiaID Join Genero ON paciente.GeneroID = Genero.GeneroID
            WHERE (paciente.Nombre LIKE ? OR paciente.Apellido LIKE ? OR paciente.Cedula LIKE ?)
        `;
        const values = [`%${filtro}%`, `%${filtro}%`, `%${filtro}%`];

        if (patologia) {
            query += ' AND patologia.Patologia LIKE ?';
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

    agregar_paciente(nombre, apellido, cedula, telefono, edad, patologia, genero, FechaNacimiento, direccion) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `INSERT INTO paciente (Nombre, Apellido, Cedula, Telefono, Edad, PatologiaID, GeneroID, Direccion, FechaNacimiento)
            VALUES (?, ?, ?, ?, ?, (SELECT PatologiaID FROM patologia WHERE Patologia = ?), (SELECT GeneroID FROM Genero WHERE Codigo = ?), ?, ?);`,
            [nombre, apellido, cedula, telefono, edad, patologia, genero, direccion, FechaNacimiento],
            (error, resultados) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(resultados);
                }
            });
        });
    }

};

module.exports = paciente;