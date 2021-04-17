const Analista = require("../models/analista.model");

// create and save a new customer
exports.create = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    // create new customer
    const analista = new Analista({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        estatus: req.body.estatus
    });

    // save customer in the database
    Analista.create(analista, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the analista." });

        res.send({ message: "Analista was created successfully!", data });
    });
};

// retrieve all customers from the database
exports.findAll = (req, res) => {
    Analista.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve analista." });

        res.send(data);
    });
};

// find a single analista with the analistaId
exports.findOne = (req, res) => {
    const { analistaId } = req.params;
    Analista.findById(analistaId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found customers with id ${analistaId}` })
                : res.status(500).send({ message: `Could not retrieve customer with id ${analistaId}` });
        }

        res.send(data);
    });
};

// update a cutomer identified by the customerId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    const { analistaId } = req.params;
    const analista = new Analista(req.body);

    Analista.updateById(analistaId, analista, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro analista con id ${analistaId}` })
                : res.status(500).send({ message: `Could not update analista with id ${analistaId}` });
        }

        res.send({ message: `Analista con id  ${analistaId} was updating successfully!`, data });
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
    const { analistaId } = req.params;

    Analista.remove(analistaId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found customer with id ${analistaId}` })
                : res.status(500).send({ message: `Could not delete customer with id ${analistaId}` });
        }

        res.send({ message: "Customer was deleted successfully!" });
    });
};

// delete all customers from the database
exports.deleteAll = (req, res) => {
    Analista.removeAll((err) => {
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
