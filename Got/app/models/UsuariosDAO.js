// importar o modulo do cripto para criptografar a senha do usuario
var crypto = require('crypto');

function UsuariosDAO(connection) {
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
    // abri a conexao com o banco
    this._connection.open(function (erro, mongoClient) {
        // selecionar a tabela
        mongoClient.collection("usuarios", function (erro, collection) {
           
            //criptografar a senha do usuario antes de salvar no banco
            usuario.senha = crypto.createHash("md5").update(usuario.senha).digest("hex");

            // efetuar o comando necessario
            collection.insert(usuario);
        });
        mongoClient.close();
    });
}

UsuariosDAO.prototype.autenticar = function (user, req, res) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection("usuarios", function (erro, collection) {
           
            //criptografar a senha do usuario antes de buscar o usuario no banco
            user.senha = crypto.createHash("md5").update(user.senha).digest("hex");

            collection.find(user).toArray(function (erro, result) {

                if (result[0] != undefined) {
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                if (req.session.autorizado) {
                    res.redirect('jogo')
                } else {

                    res.render('index', { validacao: {} })
                }
            });


        });
        mongoClient.close();
    });
}




module.exports = function () {
    return UsuariosDAO;
}