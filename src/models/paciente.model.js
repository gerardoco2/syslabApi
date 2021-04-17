const db = require("./database");

const tableName = "pacientes";

// constructor
function Paciente(paciente) {
    this.cedula = paciente.cedula;
    this.nombre = paciente.nombre;
    this.apellido = paciente.apellido;
    this.fecha_nac = paciente.fecha_nac;
    this.email = paciente.email;
    this.telefono = paciente.telefono;
}

// crear nuevo paciente
Paciente.create = (paciente, result) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    db.query(sql, paciente, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { ...paciente });
    });
};

// obtener paciente por cedula
Paciente.findById = (ced, result) => {
    const sql = `SELECT * FROM ${tableName} WHERE cedula = ${ced}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length === 0) {
            result({ result: "not_found" }, null);
            return;
        }

        result(null, res[0]);

        // no se encontro paciente con la cedula
    });
};

// obtener todos los pacientes
Paciente.getAll = (result) => {
    const sql = `SELECT * FROM ${tableName}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// actualizar paciente por cedula
Paciente.updateById = (ced, paciente, result) => {
    const sql = `UPDATE ${tableName} SET nombre = ?, cedula = ?, apellido = ?, fecha_nac = ?, email = ? , telefono = ? WHERE cedula= ?`;

    db.query(sql, [paciente.nombre, paciente.cedula, paciente.apellido, paciente.fecha_nac, paciente.email, paciente.telefono, ced], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found paciente with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { ced, ...paciente });
    });
};

// eliminar un solo  paciente con la cedula
Paciente.remove = (ced, result) => {
    const sql = `DELETE FROM ${tableName} WHERE cedula = ?`;
    db.query(sql, ced, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            result({ result: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

// eliminar todos los pacientes
Paciente.removeAll = (result) => {
    const sql = `DELETE FROM ${tableName}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            result({ result: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Paciente;
