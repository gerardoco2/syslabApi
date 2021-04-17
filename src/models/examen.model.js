const db = require("./database");

const tableName = "examenes";

// constructor
function Examen(examen) {
    this.id = examen.id;
    this.analista_id = examen.analista_id;
    this.paciente_id = examen.paciente_id;
    this.fecha = examen.fecha;
}

// create new examen
Examen.create = (examen, result) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    db.query(sql, examen, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { ...examen });
    });
};

// get single customer by id
Examen.findById = (id, result) => {
    const sql = `SELECT * FROM ${tableName} WHERE id = ${id}`;
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

        // not found Customer with the id
    });
};

// get all customers
Examen.getAll = (result) => {
    const sql = `SELECT * FROM ${tableName}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// update examen by id
Examen.updateById = (id, examen, result) => {
    const sql = `UPDATE ${tableName} SET analista_id = ?, paciente_id = ?, fecha = ? WHERE id= ?`;

    db.query(sql, [examen.analista_id, examen.paciente, examen.fecha, id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found examen with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id, ...examen });
    });
};


Examen.deleteLogicalById = (id, result) => {
    const sql = `UPDATE ${tableName} SET estatus = "inactivo" WHERE id= ${id}`;

    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Customer with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id });
    });
};

Examen.activateById = (id, result) => {
    const sql = `UPDATE ${tableName} SET estatus = "activo" WHERE id= ${id}`;

    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found examen with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id });
    });
};

// remove single examen with the id
Examen.remove = (id, result) => {
    const sql = `DELETE FROM ${tableName} WHERE id = ?`;
    db.query(sql, id, (err, res) => {
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

// remove all examenes
Examen.removeAll = (result) => {
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

module.exports = Examen;
