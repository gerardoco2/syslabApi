const examenes = require("../controllers/examen.controllers");

module.exports = (app) => {
    // create a new examenes
    app.post("/examenes", examenes.create);

    // retrieve all examenes
    app.get("/examenes", examenes.findAll);

    // retrieve a single examen with examenId
    app.get("/examenes/:examenId", examenes.findOne);

    // update a customer with examenId
    app.put("/examenes/:examenId", examenes.update);

    // delete logically by examenId
    app.put("/examenes/:examenId/delete", examenes.eliminacionLogica);

    // delete logically by examenId
    app.put("/examenes/:examenId/activate", examenes.activacionDeexamen);

    // delete a customer with examenId
    app.delete("/examenes/:examenId", examenes.delete);

    // delete all examenes in the database
    app.delete("/examenes", examenes.deleteAll);
};
