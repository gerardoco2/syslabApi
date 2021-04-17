const Paciente = require("../models/paciente.model");

// creaa y guardo un nuevo paciente
exports.create = (req, res) => {
    // validar request
    if (!req.body) res.status(400).send({ message: "Contenido no puede estar vacio!" });

    // create new paciente
    const paciente = new Paciente({
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fecha_nac: req.body.fecha_nac,
        email: req.body.email,
        telefono: req.body.telefono
    });

    // Guarda paciente en la base de datos
    Paciente.create(paciente, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Ocurrio un error mientas se estaba creado el pacientes." });

        res.send({ message: "paciente creado exitosamente!", data });
    });
};

// Devuelve todos los pacientes de la base de datos
exports.findAll = (req, res) => {
    Paciente.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Ocurrio un error al devolver los pacientes." });

        res.send(data);
    });
};

// Encontrar un solo paciente con pacienteId (CEDULA)
exports.findOne = (req, res) => {
    const { pacienteId } = req.params;
    Paciente.findById(pacienteId, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found pacientes with id ${pacienteId}` })
                : res.status(500).send({ message: `Could not retrieve paciente with id ${pacienteId}` });
        }

        res.send(data);
    });
};

// actualizar un paciente identificado por el pacienteId en el request request
exports.update = (req, res) => {
    // validate request
    if (!req.body) res.status(400).send({ message: "El contenido no puede estar vacio!" });

    const { pacienteId } = req.params;
    const paciente = new Paciente(req.body);

    Paciente.updateById(pacienteId, paciente, (err, data) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found paciente with id ${pacienteId}` })
                : res.status(500).send({ message: `Could not update paciente with id ${pacienteId}` });
        }

        res.send({ message: "Paciente was updating successfully!", data });
    });
};

// delete a paciente with the specified pacienteId in the request
exports.delete = (req, res) => {
    const { pacienteId } = req.params;

    Paciente.remove(pacienteId, (err) => {
        if (err) {
            // eslint-disable-next-line no-unused-expressions
            err.result === "not_found"
                ? res.status(404).send({ message: `Not found paciente with id ${pacienteId}` })
                : res.status(500).send({ message: `Could not delete paciente with id ${pacienteId}` });
        }

        res.send({ message: "Paciente was deleted successfully!" });
    });
};

// delete all pacientes from the database
exports.deleteAll = (req, res) => {
    Pacientes.removeAll((err) => {
        if (err) {
            if (err.result === "not_found") {
                res.status(404).send({ message: "Not found any pacientes" });
            } else {
                res.status(500).send({ message: err.message || "Some error occurred while retrieve pacientes." });
            }
        }

        res.send({ message: "All pacientes was deleted successfully!" });
    });
};
