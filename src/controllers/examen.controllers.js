const Examen = require("../models/examen.model");

// create and save a new examen
exports.create = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    // create new customer
    const examen = new Examen({
        id: req.body.id,
        analista_id: req.body.analista_id,
        paciente_id: req.body.paciente_id,
        fecha: req.body.fecha,
    });

    // save customer in the database
    Examen.create(examen, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the examen." });

        res.send({ message: "Examen was created successfully!", data });
    });
};

// retrieve all Examen from the database
exports.findAll = (req, res) => {
    Examen.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve examen." });

        res.send(data);
    });
};

// find a single examen with the examenId
exports.findOne = (req, res) => {
    const { examenId } = req.params;
    Examen.findById(examenId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found customers with id ${examenId}` })
                : res.status(500).send({ message: `Could not retrieve customer with id ${examenId}` });
        }

        res.send(data);
    });
};

// update a cutomer identified by the customerId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    const { examenId } = req.params;
    const examen = new Examen(req.body);

    Examen.updateById(examenId, examen, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro examen con id ${examenId}` })
                : res.status(500).send({ message: `Could not update examen with id ${examenId}` });
        }

        res.send({ message: `examen con id  ${examenId} was updating successfully!`, data });
    });
};

exports.eliminacionLogica = (req, res) => {
    //en realidad no necesito enviar nada en el body del req porque solo voy a acualizar un dato statico en la columna de la bd
    //por lo que el reques body podria estar vacio, y por eso comento la siguiente linea
    //if (!req.body) res.status(400).send({ message: "El cuerpo del request no puede estar vacio!"});

    const { examenId } = req.params;
    const { body } = req.body;

    Examen.deleteLogicalById(examenId, (err, data) => {
        if (err) {
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro examen con id ${examenId}` })
                : res.status(500).send({ message: `Could not update examen with id ${examenId}` });
        }

        res.send({ message: `examen con id  ${examenId} was updating successfully!`, data });
    });

};
exports.activacionDeexamen = (req, res) => {
    //en realidad no necesito enviar nada en el body del req porque solo voy a acualizar un dato estatico en la columna de la bd
    //por lo que el reques body podria estar vacio, y por eso comento la siguiente linea
    //if (!req.body) res.status(400).send({ message: "El cuerpo del request no puede estar vacio!"});

    const { examenId } = req.params;


    Examen.activateById(examenId, (err, data) => {
        if (err) {
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro examen con id ${examenId}` })
                : res.status(500).send({ message: `Could not update examen with id ${examenId}` });
        }

        res.send({ message: `examen con id  ${examenId} was activated successfully!`, data });
    });

};


// delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
    const { examenId } = req.params;

    Examen.remove(examenId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found customer with id ${examenId}` })
                : res.status(500).send({ message: `Could not delete customer with id ${examenId}` });
        }

        res.send({ message: "Customer was deleted successfully!" });
    });
};

// delete all customers from the database
exports.deleteAll = (req, res) => {
    Examen.removeAll((err) => {
        if (err) {
            if (err.result === "not_found") {
                res.status(404).send({ message: "Not found any examens" });
            } else {
                res.status(500).send({ message: err.message || "Some error occurred while retrieve examens." });
            }
        }

        res.send({ message: "All customers was deleted successfully!" });
    });
};
