const conexion = require('../db.js');
const queryPromise = (sql, values) => {
    return new Promise((resolve, reject) => {
        conexion.query(sql, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    getTotalPacientes: async () => {
        try {
            const results = await queryPromise('SELECT COUNT(*) AS total FROM Pacientes');
            return results[0].total;
        } catch (error) {
            throw error;
        }
    },

    getTotalDoctores: async () => {
        try {
            // Suponiendo que Tipo_usuario_ID = 2 es "Medico"
            const results = await queryPromise('SELECT COUNT(*) AS total FROM Personal WHERE Tipo_usuario_ID = 2');
            return results[0].total;
        } catch (error) {
            throw error;
        }
    },

    getDoctoresPorEspecialidad: async () => {
        try {
            const sql = `
                SELECT e.Descripcion AS especialidad, COUNT(*) AS cantidad
                FROM Personal p
                JOIN Especialidad e ON p.Especialidad_ID = e.Id
                WHERE p.Tipo_usuario_ID = 2
                GROUP BY e.Descripcion
            `;
            const results = await queryPromise(sql);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getPersonalNoDoctoresPorTipo: async () => {
        try {
            // Suponiendo que Tipo_usuario_ID = 2 es "Medico"
            const sql = `
                SELECT tu.Descripcion AS tipo, COUNT(*) AS cantidad
                FROM Personal p
                JOIN Tipo_Usuario tu ON p.Tipo_usuario_ID = tu.Id
                WHERE p.Tipo_usuario_ID != 2
                GROUP BY tu.Descripcion
            `;
            const results = await queryPromise(sql);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getPacientesPorCondicion: async () => {
        try {
            const sql = `
                SELECT c.Descripcion AS condicion, COUNT(*) AS cantidad
                FROM Pacientes p
                JOIN Condicion c ON p.Condicion_ID = c.Id
                GROUP BY c.Descripcion
            `;
            const results = await queryPromise(sql);
            return results;
        } catch (error) {
            throw error;
        }
    },

    getCitasTotales: async () => {
        const sql = 'SELECT COUNT(*) AS total FROM Citas';
        const results = await queryPromise(sql);
        return results[0].total;
    },

    getCitasHoy: async () => {
        const sql = "SELECT COUNT(*) AS total FROM Citas WHERE DATE(Fecha) = CURDATE()";
        const results = await queryPromise(sql);
        return results[0].total;
    },

    getCitasMes: async () => {
        const sql = "SELECT COUNT(*) AS total FROM Citas WHERE YEAR(Fecha) = YEAR(CURDATE()) AND MONTH(Fecha) = MONTH(CURDATE())";
        const results = await queryPromise(sql);
        return results[0].total;
    },

    getCitasAnno: async () => {
        const sql = "SELECT COUNT(*) AS total FROM Citas WHERE YEAR(Fecha) = YEAR(CURDATE())";
        const results = await queryPromise(sql);
        return results[0].total;
    },
};