const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./variables.env" });

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("error", function(error) {
  console.log("Database Error: ", error);
});

require("./Models/device");

const app = express();

app.use(bodyParser());
app.use(cors());

app.get("/", function(req, res) {
  res.send("Funciona");
});

const routes = require("./Routes/routes");
app.use("/", routes);

app.listen(process.env.PORT, function() {
  console.log("App listening on port ", process.env.PORT);
});
