var ObjectID = require('mongodb').ObjectId;

function JogoDAO(connection) {
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function (usuario) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection("jogo", function (erro, collection) {
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000),
            });
        });
        mongoClient.close();
    });
}

JogoDAO.prototype.iniciaJogo = function (res, usuario, casa, msg) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection("jogo", function (erro, collection) {
            collection.find({ usuario: usuario }).toArray(function (erro, result) {

                res.render("jogo", { imgCasa: casa, jogo: result[0], msg: msg });

            });
        });
        mongoClient.close();
    });
}

JogoDAO.prototype.acao = function (acao) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection("acao", function (erro, collection) {

            var date = new Date();
            var tempo = null;
            switch (parseInt(acao.acao)) {
                case 1: tempo = 1 * 60 * 60000; break;
                case 2: tempo = 2 * 60 * 60000; break;
                case 3: tempo = 5 * 60 * 60000; break;
                case 4: tempo = 5 * 60 * 60000; break;
            }

            acao.terminaEm = (date.getTime() + tempo);
            collection.insert(acao);
        });


        mongoClient.collection("jogo", function (erro, collection) {
            var moedas = 0;
            switch (parseInt(acao.acao)) {
                case 1: moedas = (-2 * parseInt(acao.quantidade)); break;
                case 2: moedas = (-3 * parseInt(acao.quantidade)); break;
                case 3: moedas = (-1 * parseInt(acao.quantidade)); break;
                case 4: moedas = (-1 * parseInt(acao.quantidade)); break;
            }
            collection.update(
                { usuario: acao.usuario }
                , { $inc: { moeda: moedas, suditos: -(parseInt(acao.quantidade)) } });

        });
        mongoClient.close();
    });
}

JogoDAO.prototype.getAcao = function (usuario, res) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection("acao", function (erro, collection) {

            var tempoAtual = new Date().getTime();
            collection.find({ usuario: usuario, terminaEm: { $gt: tempoAtual } }).toArray(function (erro, result) {
                res.render('pergaminhos', { acoes: result });

            });
        });
        mongoClient.close();
    });
}

JogoDAO.prototype.revogarAcao = function (id, res) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection("acao", function (erro, collection) {
            collection.remove(
                { _id: ObjectID(id) }
                , function(erro, result) {
                    res.redirect('jogo?msg=D');
                });

        });
        mongoClient.close();
    });

}

module.exports = function () {
    return JogoDAO;
}