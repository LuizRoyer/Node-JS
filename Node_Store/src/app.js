//Instalacoes Necessarias
//npm install http express debug --save
//npm install nodemon --save-dev
//npm install body-parser --save
//npm install mongoose --save ( integar MongoDb)
// npm install guid --save  ( gerar Id Automaticamente)
// npm install md5 --save ( Criptografar senha)
//npm install sendgrid@2.0.0 -- save ( envio de Email SendGrid)
//npm install jsonwebtoken@7.4.0 --save (Autenticação Token)

"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

//Connectar ao banco
mongoose
  .connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connection Successful!!"))
  .catch(err => console.error(err));

//Carregar os Models
const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/order");

//Carregar as Rotas
const indexRoute = require("./routes/index-route");
const producRoute = require("./routes/product-route");
const customerRoute = require("./routes/customer-route");
const orderRoute = require("./routes/order-route");

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

//Habilitar o Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Context-Type Accept, X-access-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE , OPTIONS");
  next();
});

app.use("/", indexRoute);
app.use("/products", producRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);

module.exports = app;
