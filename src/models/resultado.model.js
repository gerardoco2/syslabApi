const db = require("./database");

const tableName = "resultados";

// constructor
function Resultado(resultado) {
    this.examen_id = resultado.examen_id;
    this.item_id = resultado.item_id;
    this.valor = resultado.valor;
}

// create new resultado
Resultado.create = (resultado, result) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    db.query(sql, resultado, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { ...resultado });
    });
};

// get single resultado by id
Resultado.findById = (id, result) => {
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

        // not found resultado with the id
    });
};

// get all resultados
Resultado.getAll = (result) => {
    const sql = `SELECT * FROM ${tableName}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// update resultado by id
Resultado.updateById = (id, resultado, result) => {
    const sql = `UPDATE ${tableName} SET examen_id = ?, item_id = ?, valor = ? WHERE id= ?`;

    db.query(sql, [resultado.examen_id, resultado.item_id, resultado.valor, id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found resultado with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id, ...resultado });
    });
};


Resultado.deleteLogicalById = (id, result) => {
    const sql = `UPDATE ${tableName} SET estatus = "inactivo" WHERE id= ${id}`;

    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found resultado with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id });
    });
};

Resultado.activateById = (id, result) => {
    const sql = `UPDATE ${tableName} SET estatus = "activo" WHERE id= ${id}`;

    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found resultado with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id });
    });
};

// remove single resultado with the id
Resultado.remove = (id, result) => {
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

// remove all resultados
Resultado.removeAll = (result) => {
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

module.exports = Resultado;
