const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
}); */

/* 
app.use((req, res, next) => {
  res.header('Access-control-Allow-origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control.Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
}); */



// default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application!" });
});

// customers route
require("./src/routes/customer.routes.js")(app);
require("./src/routes/analista.routes.js")(app);
require("./src/routes/paciente.routes.js")(app);
require("./src/routes/tipoExamen.routes.js")(app);
require("./src/routes/item.routes.js")(app);
require("./src/routes/resultado.routes.js")(app);
require("./src/routes/unidad.routes.js")(app);
require("./src/routes/examen.routes.js")(app);

// set port, listen for requests
app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log("Server is running on port 3001");
});
