const resultados = require("../controllers/resultado.controllers");

module.exports = (app) => {
    // create a new resultado
    app.post("/resultados", resultados.create);

    // retrieve all resultados
    app.get("/resultados", resultados.findAll);

    // retrieve a single resultado with resultadoId
    app.get("/resultados/:resultadoId", resultados.findOne);

    // update a resultado with resultadoId
    app.put("/resultados/:resultadoId", resultados.update);

    // delete logically by resultadoId
    app.put("/resultados/:resultadoId/delete", resultados.eliminacionLogica);

    // delete logically by resultadoId
    app.put("/resultados/:resultadoId/activate", resultados.activacionDeResultado);

    // delete a resultado with resultadoId
    app.delete("/resultados/:resultadoId", resultados.delete);

    // delete all resultados in the database
    app.delete("/resultados", resultados.deleteAll);
};
