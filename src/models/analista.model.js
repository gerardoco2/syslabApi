const db = require("./database");

const tableName = "analistas";

// constructor
function Analista(analista) {
    this.nombre = analista.nombre;
    this.apellido = analista.apellido;
    this.email = analista.email;
    this.password = analista.password;
    this.estatus = analista.estatus;
}

// create new customer
Analista.create = (analista, result) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    db.query(sql, analista, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { ...analista });
    });
};

// get single customer by id
Analista.findById = (id, result) => {
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
Analista.getAll = (result) => {
    const sql = `SELECT * FROM ${tableName}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// update analista by id
Analista.updateById = (id, analista, result) => {
    const sql = `UPDATE ${tableName} SET nombre = ?, apellido = ?, email = ?, password = ?, estatus = ? WHERE id= ?`;

    db.query(sql, [analista.nombre, analista.apellido, analista.email, analista.password, analista.estatus, id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Customer with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id, ...analista });
    });
};


Analista.deleteLogicalById = (id, result) => {
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

Analista.activateById = (id, result) => {
    const sql = `UPDATE ${tableName} SET estatus = "activo" WHERE id= ${id}`;

    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found analista with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id });
    });
};

// remove single customer with the id
Analista.remove = (id, result) => {
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

// remove all customers
Analista.removeAll = (result) => {
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

module.exports = Analista;
