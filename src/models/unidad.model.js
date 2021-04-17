const db = require("./database");

const tableName = "unidades";

// constructor
function Unidad(unidad) {
    this.nombre = unidad.nombre;
    this.descripcion = unidad.descripcion;
}

// create new unidad
Unidad.create = (unidad, result) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    db.query(sql, unidad, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { ...unidad });
    });
};

// get single unidad by id
Unidad.findById = (id, result) => {
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

        // not found unidad with the id
    });
};

// get all unidad
Unidad.getAll = (result) => {
    const sql = `SELECT * FROM ${tableName}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// update unidad by id
Unidad.updateById = (id, unidad, result) => {
    const sql = `UPDATE ${tableName} SET nombre = ?, descripcion = ? WHERE id= ?`;

    db.query(sql, [unidad.nombre, unidad.descripcion, id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found unidad with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id, ...unidad });
    });
};


Unidad.deleteLogicalById = (id, result) => {
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

Unidad.activateById = (id, result) => {
    const sql = `UPDATE ${tableName} SET estatus = "activo" WHERE id= ${id}`;

    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found unidad with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id });
    });
};

// remove single unidad with the id
Unidad.remove = (id, result) => {
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

// remove all unidades
Unidad.removeAll = (result) => {
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

module.exports = Unidad;
