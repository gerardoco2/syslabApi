const db = require("./database");

const tableName = "items";

// constructor
function Item(item) {
    this.nombre = item.nombre;
    this.descripcion = item.descripcion;
    this.valorInicial = item.valorInicial;
    this.valorFinal = item.valorFinal;
    this.unidad_id = item.unidad_id;
    this.tipoExamen_id = item.tipoExamen_id;
}

// create new item
Item.create = (item, result) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    db.query(sql, item, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { ...item });
    });
};

// get single item by id
Item.findById = (id, result) => {
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

        // not found item with the id
    });
};

//obtiene items por el tipo de examen
Item.findItemsByTipoExam = (tipoExamen_id, result) => {
    const sql = `SELECT * FROM ${tableName} WHERE tipoexamen_id = "${tipoExamen_id}"`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
}

// get all item
Item.getAll = (result) => {
    const sql = `SELECT * FROM ${tableName}`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

// update item by id
Item.updateById = (id, item, result) => {
    const sql = `UPDATE ${tableName} SET nombre = ?, descripcion = ?, valorIni = ?, valorFin = ?, unidad_id = ?  WHERE id= ?`;

    db.query(sql, [item.nombre, item.descripcion, item.valorInicial, item.valorFinal, item.unidad_Id, id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found item with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id, ...item });
    });
};


Item.deleteLogicalById = (id, result) => {
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

Item.activateById = (id, result) => {
    const sql = `UPDATE ${tableName} SET estatus = "activo" WHERE id= ${id}`;

    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found item with the id
            result({ result: "not_found" }, null);
            return;
        }

        result(null, { id });
    });
};

// remove single item with the id
Item.remove = (id, result) => {
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

// remove all itemes
Item.removeAll = (result) => {
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

module.exports = Item;
