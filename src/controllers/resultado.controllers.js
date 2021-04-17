const Resultado = require("../models/resultado.model");

// create and save a new resultado
exports.create = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    // create new resultado
    const resultado = new Resultado({
        examen_id: req.body.examen_id,
        item_id: req.body.item_id,
        valor: req.body.valor
    });

    // save resultado in the database
    Resultado.create(resultado, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the resultado." });

        res.send({ message: "resultado was created successfully!", data });
    });
};

// retrieve all Resultados from the database
exports.findAll = (req, res) => {
    Resultado.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieve resultado." });

        res.send(data);
    });
};

// find a single resultado with the resultadoId
exports.findOne = (req, res) => {
    const { resultadoId } = req.params;
    Resultado.findById(resultadoId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found resultados with id ${resultadoId}` })
                : res.status(500).send({ message: `Could not retrieve resultados with id ${resultadoId}` });
        }

        res.send(data);
    });
};

// update a cutomer identified by the customerId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    const { resultadoId } = req.params;
    const resultado = new Resultado(req.body);

    Resultado.updateById(resultadoId, resultado, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro resultado con id ${resultadoId}` })
                : res.status(500).send({ message: `Could not update resultado with id ${resultadoId}` });
        }

        res.send({ message: `Resultado con id  ${resultadoId} was updating successfully!`, data });
    });
};

exports.eliminacionLogica = (req, res) => {
    //en realidad no necesito enviar nada en el body del req porque solo voy a acualizar un dato statico en la columna de la bd
    //por lo que el reques body podria estar vacio, y por eso comento la siguiente linea
    //if (!req.body) res.status(400).send({ message: "El cuerpo del request no puede estar vacio!"});

    const { resultadoId } = req.params;
    const { body } = req.body;

    Resultado.deleteLogicalById(resultadoId, (err, data) => {
        if (err) {
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro resultado con id ${resultadoId}` })
                : res.status(500).send({ message: `Could not update resultado with id ${resultadoId}` });
        }

        res.send({ message: `Resultado con id  ${resultadoId} was updating successfully!`, data });
    });

};
exports.activacionDeResultado = (req, res) => {
    //en realidad no necesito enviar nada en el body del req porque solo voy a acualizar un dato estatico en la columna de la bd
    //por lo que el reques body podria estar vacio, y por eso comento la siguiente linea
    //if (!req.body) res.status(400).send({ message: "El cuerpo del request no puede estar vacio!"});

    const { resultadoId } = req.params;


    Resultado.activateById(resultadoId, (err, data) => {
        if (err) {
            err.result === "not_found"
                ? res.status(404).send({ message: `No se encontro resultado con id ${analistaId}` })
                : res.status(500).send({ message: `Could not update resultado with id ${analistaId}` });
        }

        res.send({ message: `Resultado con id  ${resultadoId} was activated successfully!`, data });
    });

};


// delete a resultado with the specified resultadoId in the request
exports.delete = (req, res) => {
    const { resultadoId } = req.params;

    Resultado.remove(resultadoId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found resultado with id ${resultadoId}` })
                : res.status(500).send({ message: `Could not delete resultado with id ${resultadoId}` });
        }

        res.send({ message: "resultado was deleted successfully!" });
    });
};

// delete all resultados from the database
exports.deleteAll = (req, res) => {
    Resultado.removeAll((err) => {
        if (err) {
            if (err.result === "not_found") {
                res.status(404).send({ message: "Not found any resultados" });
            } else {
                res.status(500).send({ message: err.message || "Some error occurred while retrieve resultados." });
            }
        }

        res.send({ message: "All resultados was deleted successfully!" });
    });
};
