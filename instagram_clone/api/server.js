var express = require('express'),
    bodyParser = require('body-parser'),
    mongo = require('mongodb'),
    multiparty = require('connect-multiparty'),
    fs = require('fs'),
    objectId = require('mongodb').ObjectId;



var app = express();

//configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());

var port = 8080;
app.listen(port);

var db = new mongo.Db(
    'instagran',
    new mongo.Server(
        'localhost', // string do endereço do servidor 
        27017, // porta de conexão
        {} // objeto com configuracoes do servidor
    ),
    {}
);


console.log('Servidor Online porta ' + port);

app.get('/', function (req, res) {
    res.send({ msg: 'Olá mundo' });
});

app.post('/api', function (req, res) {

    //permitir acesso apenas a porta de resposta
    res.setHeader("Access-Control-Aloow-Origin", "*");

    var pathOrigen = req.files.arquivo.path;
    var pathDestino = './uploads/' + req.files.arquivo.originalFilename;
    //mover o arquivo para a pasta desejada
    fs.copyFile(pathOrigen, pathDestino, function (erro) {
        if (erro) {
            res.status(500).json({ error: erro });
            return;
        }
    });

    var dados = {
        urlImagem: req.files.arquivo.originalFilename,
        titulo: req.body.titulo
    }
    
    db.open(function (erro, mongoClient) {
        mongoClient.collection('postagens', function (erro, collection) {
            collection.insert(dados, function (erro, result) {
                if (erro) {
                    res.json(erro);
                } else {
                    res.json(result);
                }
                mongoClient.close();
            });
        })
    })
});

app.get('/api/:id?', function (req, res) {
 
    //permitir acesso apenas a porta de resposta
 res.setHeader("Access-Control-Aloow-Origin", "*");

 console.log("acessou");
    db.open(function (erro, mongoClient) {
        mongoClient.collection('postagens', function (erro, collection) {

            if (req.params.id === undefined) {
                collection.find().toArray(function (erro, result) {

                    if (erro) {
                        res.status(400).json(erro);
                    } else {
                        res.json(result);
                    }
                });
            } else {
                collection.find(objectId(req.params.id)).toArray(function (erro, result) {

                    if (erro) {
                        res.json(erro);
                    } else {
                        res.json(result);
                    }
                });
            }
            mongoClient.close();
        });
    });

});

app.put('/api/:id', function (req, res) {

    db.open(function (erro, mongoClient) {
        mongoClient.collection('postagens', function (erro, collection) {
            collection.update(
                { _id: objectId(req.params.id) },
                {
                    $set: {
                        titulo: req.body.titulo,
                        urlImagem: req.body.urlImagem
                    }
                },
                {},
                function (erro, result) {
                    if (erro) {
                        res.status(400).json(erro);
                    } else {
                        res.json(result);
                    }
                }
            );
            mongoClient.close();
        });
    });
});
app.delete('/api/:id', function (req, res) {
    db.open(function (erro, mongoClient) {
        mongoClient.collection('postagens', function (erro, collection) {
            collection.remove({ _id: objectId(req.params.id) }, function (erro, result) {
                if (erro) {
                    res.status(500).json(erro);
                } else {
                    res.json(result);
                }
            });
            mongoClient.close();
        });
    });
});

/*
Status Api

200 ok
400 bad request
409 duplicidade
500 erro interno
404 pagina nao encontrada
304 sem modificação

*/