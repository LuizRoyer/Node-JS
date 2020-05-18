// importar o modulo do framework express
var express = require('express');

//importar o modulo do consign
var consign = require('consign');

//importat o modulo do body-parse
var bodyParser= require('body-parser');

//Importar o modulo do express validator
var expressValidator = require('express-validator');

//Inicializar o objeto do express
var app = express();

//configurar o EJS
//setar as variaveis 'views engine ' e 'views' do express
app.set('view engine','ejs');
app.set('views','./app/views');

//configurar o middleware  express.satic
app.use(express.static('./app/public'));

// configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended:true}));

//configurar o middleware express validator
app.use(expressValidator());

//efetua o autoloand das rotas dos models e dos controllers para o objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

//exportar o objeto app
module.exports = app;

