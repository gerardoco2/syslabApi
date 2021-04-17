const TipoExamen = require("../models/tipoExamen.model");

// create and save a new customer
exports.create = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    // create new tipoExamen
    const tipoExamen = new TipoExamen({
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    });

    // save TipoExamen in the database
    TipoExamen.create(tipoExamen, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the tipoExamen." });
        res.send({ message: "tipoExamen was created successfully!", data });
    });
};

// retrieve all tipoExamenes from the database
exports.findAll = (req, res) => {
    TipoExamen.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve tipoExamenes." });

        res.send(data);
    });
};

exports.findItemsByExamId = (req, res) => {
    const { tipoExamenId } = req.params;
    TipoExamen.getAllItemsByExam(tipoExamenId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontraron items para el TIPO EXAMEN  ${tipoExamenId}` })
                : res.status(500).send({ message: `No pudo devolver items para el examen con id ${tipoExamenId}` });
        }

        res.send(data);
    });
};

// find a single tipoExamen with the tipoExamenId
exports.findOne = (req, res) => {
    const { tipoExamenId } = req.params;
    TipoExamen.findById(tipoExamenId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found tipoExamenes with id ${tipoExamenId}` })
                : res.status(500).send({ message: `Could not retrieve tipoExamen with id ${tipoExamenId}` });
        }

        res.send(data);
    });
};

// update a tipoExamen identified by the tipoExamenId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    const { tipoExamenId } = req.params;
    const tipoExamen = new tipoExamen(req.body);

    TipoExamen.updateById(tipoExamenId, tipoExamen, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro tipoExamen con id ${tipoExamenId}` })
                : res.status(500).send({ message: `Could not update tipoExamen with id ${tipoExamenId}` });
        }

        res.send({ message: `tipoExamen con id  ${tipoExamenId} was updating successfully!`, data });
    });
};

exports.eliminacionLogica = (req, res) => {
    //en realidad no necesito enviar nada en el body del req porque solo voy a acualizar un dato statico en la columna de la bd
    //por lo que el reques body podria estar vacio, y por eso comento la siguiente linea
    //if (!req.body) res.status(400).send({ message: "El cuerpo del request no puede estar vacio!"});

    const { analistaId } = req.params;
    const { body } = req.body;

    TipoExamen.deleteLogicalById(analistaId, (err, data) => {
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


    TipoExamen.activateById(analistaId, (err, data) => {
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
    const { tipoExamenId } = req.params;

    TipoExamen.remove(tipoExamenId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found customer with id ${tipoExamenId}` })
                : res.status(500).send({ message: `Could not delete customer with id ${tipoExamenId}` });
        }

        res.send({ message: "tipoExamen was deleted successfully!" });
    });
};

// delete all customers from the database
exports.deleteAll = (req, res) => {
    TipoExamen.removeAll((err) => {
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
