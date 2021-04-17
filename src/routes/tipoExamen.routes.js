const tipoExamen = require("../controllers/tipoExamen.controllers");

module.exports = (app) => {
    // create a new tipo-examen
    app.post("/tipo-examen", tipoExamen.create);

    // retrieve all tipo-examens
    app.get("/tipo-examen", tipoExamen.findAll);

    // retrieve a single tipo-examen with tipo-examenId
    app.get("/tipo-examen/:tipoExamenId", tipoExamen.findOne);

    // Retorna todos los items de un tipo de examen dado el id del tipo de examen
    app.get("/tipo-examen/:tipoExamenId/items", tipoExamen.findItemsByExamId)

    // update a tipo-examen with tipo-examenId
    app.put("/tipo-examen/:tipoExamenId", tipoExamen.update);

    // delete logically by tipo-examenId
    app.put("/tipo-examen/:tipoExamenId/delete", tipoExamen.eliminacionLogica);

    // delete logically by tipo-examenId
    app.put("/tipo-examen/:tipoExamenId/activate", tipoExamen.activacionDeAnalista);

    // delete a tipo-examen with tipo-examenId
    app.delete("/tipo-examen/:tipoExamenId", tipoExamen.delete);

    // delete all tipo-examens in the database
    app.delete("/tipo-examen", tipoExamen.deleteAll);
};
