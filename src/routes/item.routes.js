const items = require("../controllers/item.controllers");

module.exports = (app) => {
    // create a new customer
    app.post("/items", items.create);

    // retrieve all customers
    app.get("/items", items.findAll);

    // retrieve a single customer with customerId
    app.get("/items/:itemId", items.findOne);

    // Devuelve todos los items dado el id del tipo examen ( tipoExamenId)
    app.get("/items/examenes/:tipoExamenId", items.findByTipoExamenId);

    // update a customer with customerId
    app.put("/items/:itemsId", items.update);

    // delete logically by itemsId
    app.put("/items/:itemsId/delete", items.eliminacionLogica);

    // delete logically by itemsId
    app.put("/items/:itemsId/activate", items.activacionDeAnalista);

    // delete a customer with customerId
    app.delete("/items/:itemsId", items.delete);

    // delete all customers in the database
    app.delete("/items", items.deleteAll);
};
