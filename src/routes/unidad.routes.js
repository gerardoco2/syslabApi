const unidades = require("../controllers/unidad.controllers");

module.exports = (app) => {
    // create a new unidad
    app.post("/unidades", unidades.create);

    // retrieve all unidad
    app.get("/unidades", unidades.findAll);

    // retrieve a single unidad with customerId
    app.get("/unidades/:unidadId", unidades.findOne);

    // update a unidad with unidadId
    app.put("/unidades/:unidadId", unidades.update);

    // delete logically by unidadId
    app.put("/unidades/:unidadId/delete", unidades.eliminacionLogica);

    // delete logically by unidadId
    app.put("/unidades/:unidadId/activate", unidades.activacionDeAnalista);

    // delete an unidad with unidadId
    app.delete("/unidades/:unidadId", unidades.delete);

    // delete all unidades in the database
    app.delete("/unidades", unidades.deleteAll);
};
