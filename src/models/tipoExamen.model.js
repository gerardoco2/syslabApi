const db = require("./database");

const tableName = "tipoexamens";

// constructor
function TipoExamen(tipoExamen) {
    this.id = tipoExamen.id;
    this.nombre = tipoExamen.nombre;
    this.descripcion = tipoExamen.descripcion;
}

// create new tipoExamen
TipoExamen.create = (tipoExamen, result) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    db.query(sql, tipoExamen, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { ...tipoExamen });
    });
};

// get single tipoExamen by id
TipoExamen.findById = (id, result) => {
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

        // not found tipoExamen with the id
    });
};

// get all tipoExamen
TipoExamen.getAll = (result) => {
    const sql = `SELECT * FROM ${tableName}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};
// Obtener todos los items dado un examen
TipoExamen.getAllItemsByExam = (id, result) => {
    const sql = `SELECT DISTINCT items.id,items.nombre, items.descripcion, items.valorInicial, items.valorFinal, items.unidad_id, items.tipoexamen_id 
    FROM ${tableName} 
    INNER JOIN items ON "${id}" = items.tipoexamen_id`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// update tipoExamen by id
TipoExamen.updateById = (id, tipoExamen, result) => {
    const sql = `UPDATE ${tableName} SET nombre = ?, descripcion = ? WHERE id= ?`;

    db.query(sql, [tipoExamen.nombre, tipoExamen.descripcion, id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found tipoExamen with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id, ...tipoExamen });
    });
};


TipoExamen.deleteLogicalById = (id, result) => {
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

TipoExamen.activateById = (id, result) => {
    const sql = `UPDATE ${tableName} SET estatus = "activo" WHERE id= ${id}`;

    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found tipoExamen with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id });
    });
};

// remove single tipoExamen with the id
TipoExamen.remove = (id, result) => {
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

// remove all tipoExamenes
TipoExamen.removeAll = (result) => {
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

module.exports = TipoExamen;
