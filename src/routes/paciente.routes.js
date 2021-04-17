const pacientes = require("../controllers/paciente.controllers");

module.exports = (app) => {
    // crea un nuevo paciente
    app.post("/pacientes", pacientes.create);

    // devuelve todos los paciente
    app.get("/pacientes", pacientes.findAll);

    // devuelve un solo paciente con pacienteId ( cedula )
    app.get("/pacientes/:pacienteId", pacientes.findOne);

    // Actualiza paciente con pacienteId
    app.put("/pacientes/:pacienteId", pacientes.update);

    // delete a paciente with customerId
    app.delete("/pacientes/:pacienteId", pacientes.delete);

    // delete all pacientes in the database
    app.delete("/pacientes", pacientes.deleteAll);
};
