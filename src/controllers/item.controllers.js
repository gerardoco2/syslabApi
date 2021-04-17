const Item = require("../models/item.model");

// create and save a new customer
exports.create = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    // create new customer
    const item = new Item({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        valorInicial: req.body.valorInicial,
        valorFinal: req.body.valorFinal,
        unidad_id: req.body.unidad_id,
        tipoExamen_id: req.body.tipoExamen_id
    });

    // save customer in the database
    Item.create(item, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the item." });

        res.send({ message: "Item  was created successfully!", data });
    });
};

// retrieve all customers from the database
exports.findAll = (req, res) => {
    Item.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve item." });

        res.send(data);
    });
};

// find a single analista with the analistaId
exports.findOne = (req, res) => {
    const { itemId } = req.params;
    Item.findById(itemId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found items with id ${itemId}` })
                : res.status(500).send({ message: `Could not retrieve item with id ${itemId}` });
        }

        res.send(data);
    });
};

exports.findByTipoExamenId = (req, res) => {
    const { tipoExamenId } = req.params;
    Item.findItemsByTipoExam(tipoExamenId, (err, data) => {
        if (err) {
            err.result === "No Encontrado"
                ? res.status(404).send({ message: `No se Encontraron items para el examen con ID ${tipoExamenId}` })
                : res.status(500).send({ message: `No se pudo devolver los items para el tipo Examen ${tipoExamenId}` });
        }
        res.send(data);
    });
};

// update a cutomer identified by the customerId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    const { itemId } = req.params;
    const item = new Item(req.body);

    Item.updateById(itemId, item, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro item con id ${itemId}` })
                : res.status(500).send({ message: `Could not update item with id ${itemId}` });
        }

        res.send({ message: `Item  con id  ${itemId} was updating successfully!`, data });
    });
};

exports.eliminacionLogica = (req, res) => {
    //en realidad no necesito enviar nada en el body del req porque solo voy a acualizar un dato statico en la columna de la bd
    //por lo que el reques body podria estar vacio, y por eso comento la siguiente linea
    //if (!req.body) res.status(400).send({ message: "El cuerpo del request no puede estar vacio!"});

    const { itemId } = req.params;
    const { body } = req.body;

    Item.deleteLogicalById(itemId, (err, data) => {
        if (err) {
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro analista con id ${analistaId}` })
                : res.status(500).send({ message: `Could not update analista with id ${analistaId}` });
        }

        res.send({ message: `Analista con id  ${analistaId} was updating successfully!`, data });
    });

};
exports.activacionDeAnalista = (req, res) => {
    //en realidad no necesito enviar nada en el body del req porque solo voy a acualizar un dato estatico en la columna de la bd
    //por lo que el reques body podria estar vacio, y por eso comento la siguiente linea
    //if (!req.body) res.status(400).send({ message: "El cuerpo del request no puede estar vacio!"});

    const { itemIf } = req.params;


    Item.activateById(itemId, (err, data) => {
        if (err) {
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro analista con id ${analistaId}` })
                : res.status(500).send({ message: `Could not update analista with id ${analistaId}` });
        }

        res.send({ message: `Analista con id  ${itemId} was activated successfully!`, data });
    });

};


// delete a item with the specified item id in the request
exports.delete = (req, res) => {
    const { itemsId } = req.params;

    Item.remove(itemsId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found customer with id ${itemsId}` })
                : res.status(500).send({ message: `Could not delete customer with id ${itemsId}` });
        }

        res.send({ message: "Item was deleted successfully!" });
    });
};

// delete all customers from the database
exports.deleteAll = (req, res) => {
    Item.removeAll((err) => {
        if (err) {
            if (err.result === "not_found") {
                res.status(404).send({ message: "Not found any analistas" });
            } else {
                res.status(500).send({ message: err.message || "Some error occurred while retrieve analistas." });
            }
        }

        res.send({ message: "All customers was deleted successfully!" });
    });
};
