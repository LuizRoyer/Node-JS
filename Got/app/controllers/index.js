module.exports.index = function (aplication, req, res) {
    res.render('index', { validacao: {} });
}

module.exports.autenticar = function (aplication, req, res) {

    var dadosForm = req.body;

    req.assert('usuario', 'Campo Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Campo Senha é Obrigatório').notEmpty();

    var erros = req.validationErrors();
    
    if (erros) {
        res.render('index', { validacao: erros });
        return
    }
var connection = aplication.config.dbConnection;
    var UsuariosDAO = new aplication.app.models.UsuariosDAO(connection);
   
   UsuariosDAO.autenticar(dadosForm, req, res);
    

}