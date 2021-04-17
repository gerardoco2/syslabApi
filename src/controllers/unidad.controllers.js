const Unidad = require("../models/unidad.model");

// create and save a new customer
exports.create = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    // create new unidad
    const unidad = new Unidad({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    });

    // save unidad in the database
    Unidad.create(unidad, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the unidad." });
        res.send({ message: "Unidad was created successfully!", data });
    });
};

// retrieve all unidades from the database
exports.findAll = (req, res) => {
    Unidad.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve unidades." });

        res.send(data);
    });
};

// find a single unidad with the unidadId
exports.findOne = (req, res) => {
    const { unidadId } = req.params;
    Unidad.findById(unidadId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found unidades with id ${unidadId}` })
                : res.status(500).send({ message: `Could not retrieve unidad with id ${unidadId}` });
        }

        res.send(data);
    });
};

// update a unidad identified by the unidadId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    const { unidadId } = req.params;
    const unidad = new Unidad(req.body);

    Unidad.updateById(unidadId, unidad, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro unidad con id ${unidadId}` })
                : res.status(500).send({ message: `Could not update unidad with id ${unidadId}` });
        }

        res.send({ message: `Unidad con id  ${unidadId} was updating successfully!`, data });
    });
};

exports.eliminacionLogica = (req, res) => {
    //en realidad no necesito enviar nada en el body del req porque solo voy a acualizar un dato statico en la columna de la bd
    //por lo que el reques body podria estar vacio, y por eso comento la siguiente linea
    //if (!req.body) res.status(400).send({ message: "El cuerpo del request no puede estar vacio!"});

    const { analistaId } = req.params;
    const { body } = req.body;

    Analista.deleteLogicalById(analistaId, (err, data) => {
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

    const { analistaId } = req.params;


    Analista.activateById(analistaId, (err, data) => {
        if (err) {
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro analista con id ${analistaId}` })
                : res.status(500).send({ message: `Could not update analista with id ${analistaId}` });
        }

        res.send({ message: `Analista con id  ${analistaId} was activated successfully!`, data });
    });

};


// delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
    const { unidadId } = req.params;

    Unidad.remove(unidadId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found customer with id ${unidadId}` })
                : res.status(500).send({ message: `Could not delete customer with id ${unidadId}` });
        }

        res.send({ message: "unidad was deleted successfully!" });
    });
};

// delete all customers from the database
exports.deleteAll = (req, res) => {
    Unidad.removeAll((err) => {
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
