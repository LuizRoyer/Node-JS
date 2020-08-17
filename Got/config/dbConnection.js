// importar o mondoDB
// nao esqueca de adicionar o modulo do mongo no consign  no arquivo server.js
// versao mongo  -> npm install --save mongodb@2.2.9
var mongo = require('mongodb');

var connMongoDB = function () {
    /* Banco espera 3 parametros
      1- nome do banco
      2- configuracao do servidor
      3- configuracoes opcionais
  */
    var db = new mongo.Db(
        'got',
        new mongo.Server(
            '127.0.0.1', // string do endereço do servidor 
            27017, // porta de conexão
            {} // objeto com configuracoes do servidor
        ),
        {}
    );
    return db;
}


module.exports = function () {
    // exportar uma variavel para quando necessario abrir a conexao com o banco 
    return connMongoDB;
}