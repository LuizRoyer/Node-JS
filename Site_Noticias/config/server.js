var express = require('express');
var consign = require('consign');
var bodyParse= require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.set('views','./app/views');

app.use(bodyParse.urlencoded({extended:true}));
app.use(express.static('./app/public'));

consign()
.include('./app/routes')
.then('config/dbConnection.js')
.then('app/models')
.then('app/controllers')
.into(app);

module.exports = app;