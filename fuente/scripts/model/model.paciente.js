const conexion = require('../db');
const paciente = {
    ver_paciente() {
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT 
                    Pacientes.Id AS id,
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
                    Pacientes.Id AS id,
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

    agregar_paciente(nombre, apellido, cedula, edad, genero_id, patologia_id, email, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id, direccion, telefono) {
    return new Promise((resolve, reject) => {
        conexion.query(
            `INSERT INTO Pacientes 
                (Nombres, Apellidos, Cedula, Edad, Genero_ID, Patologia_ID, Email, Ocupacion, Estado_Civil_ID, Condicion_ID, Tipo_de_sangre_ID, Direccion)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, cedula, edad, genero_id, patologia_id, email, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id, direccion],
            (error, resultados) => {
                if (error) {
                    reject(error);
                } else {
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
    },

    eliminar_paciente(id) {
        return new Promise((resolve, reject) => {
            conexion.query(
                `DELETE FROM Telefono_Paciente WHERE Paciente_ID = ?`, [id], (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        conexion.query(
                            `DELETE FROM Pacientes WHERE Id = ?`, [id],
                            (error, resultados) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(resultados);
                            }
                        }
                        );
                    }
                }
            );
        });
    },

    editar_paciente(id){
        return new Promise((resolve, reject) => {
            conexion.query(
                `SELECT 
                    Pacientes.Id AS id,
                    Pacientes.Nombres, 
                    Pacientes.Apellidos, 
                    Pacientes.Cedula, 
                    Pacientes.Edad, 
                    Genero.Tipo AS Genero, 
                    Patologia.Nombre AS Patologia,
                    (SELECT Numero FROM Telefono_Paciente WHERE Paciente_ID = Pacientes.Id LIMIT 1) AS Telefono, 
                    Pacientes.Email, 
                    Pacientes.Ocupacion,
                    Estado_civil.Estado AS "Estado Civil",
                    Condicion.Descripcion AS Condicion,
                    Tipo_de_Sangre.Tipo AS "Tipo de Sangre",
                    Pacientes.Direccion
                FROM Pacientes
                LEFT JOIN Patologia ON Pacientes.Patologia_ID = Patologia.Id
                LEFT JOIN Genero ON Pacientes.Genero_ID = Genero.Id
                LEFT JOIN Estado_civil ON Pacientes.Estado_Civil_ID = Estado_civil.Id
                LEFT JOIN Condicion ON Pacientes.Condicion_ID = Condicion.Id
                LEFT JOIN Tipo_de_Sangre ON Pacientes.Tipo_de_sangre_ID = Tipo_de_Sangre.Id
                WHERE Pacientes.Id = ?`, [id],
                (error, resultados) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(resultados[0]);
                    }
                }
            );
        })
    },

    actualizar_paciente(paciente_id, nombre, apellido, cedula, edad, genero_id, patologia_id, email, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id, direccion, telefono){
        return new Promise((resolve, reject) => {
            conexion.query(
                `UPDATE Pacientes SET Nombres = ?, Apellidos = ?, Cedula = ?, Edad = ?, Genero_ID = ?, Patologia_ID = ?, Email = ?, Ocupacion = ?, Estado_Civil_ID = ?, Condicion_ID = ?, Tipo_de_sangre_ID = ?, Direccion = ? WHERE Pacientes.Id = ?`, [nombre, apellido, cedula, edad, genero_id, patologia_id, email, ocupacion, estado_civil_id, condicion_id, tipo_de_sangre_id, direccion, paciente_id],
                (error, resultados) => {
                    if (error){
                        reject(error);
                    } else {
                        conexion.query(
                            `UPDATE Telefono_Paciente SET Numero = ? WHERE Paciente_ID = ?`, [telefono, paciente_id],
                            (error) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(resultados);
                                }
                            }
                        );
                    }
                }
            )
        })
    },

    obtener_Sangre() {
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT Id, Tipo FROM Tipo_de_sangre`, (err, res) => {
            if (err) reject(err);
            else resolve(res);
            });
        });
    },

    obtener_Civil(){
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT Id, Estado FROM Estado_civil`, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
};

module.exports = paciente;