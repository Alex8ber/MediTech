const conexion = require('../db');
const paciente = {
    ver_paciente() {
        return new Promise((resolve, reject) => {
            conexion.query(
                'SELECT paciente.Nombre, paciente.Apellido, paciente.Cedula, paciente.Edad, paciente.Genero, patologia.Patologia, paciente.FechaNacimiento, Telefono, Direccion FROM paciente JOIN patologia ON paciente.PatologiaID = patologia.PatologiaID', (error, resultados) => {
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
            SELECT paciente.Nombre, paciente.Apellido, paciente.FechaNacimiento, paciente.Telefono, paciente.Direccion, paciente.Cedula, paciente.Edad, paciente.Genero, patologia.Patologia
            FROM paciente
            JOIN patologia ON paciente.PatologiaID = patologia.PatologiaID
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
            `INSERT INTO paciente (Nombre, Apellido, Cedula, Telefono, Edad, PatologiaID, Genero, Direccion, FechaNacimiento)
            VALUES (?, ?, ?, ?, ?, (SELECT PatologiaID FROM patologia WHERE Patologia = ?), ?, ?, ?);`,
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