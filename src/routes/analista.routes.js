const analistas = require("../controllers/analista.controllers");

module.exports = (app) => {
    // create a new customer
    app.post("/analistas", analistas.create);

    // retrieve all customers
    app.get("/analistas", analistas.findAll);

    // retrieve a single customer with customerId
    app.get("/analistas/:analistaId", analistas.findOne);

    // update a customer with customerId
    app.put("/analistas/:analistaId", analistas.update);

    // delete logically by analistaId
    app.put("/analistas/:analistaId/delete", analistas.eliminacionLogica);

    // delete logically by analistaId
    app.put("/analistas/:analistaId/activate", analistas.activacionDeAnalista);

    // delete a customer with customerId
    app.delete("/analistas/:analistaId", analistas.delete);

    // delete all customers in the database
    app.delete("/analistas", analistas.deleteAll);
};
