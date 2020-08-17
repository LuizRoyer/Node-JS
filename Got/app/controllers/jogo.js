module.exports.jogo = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.render('index', { validacao: {} });
        return;
    }

    var msg = ''
    if (req.query.msg !== '') {
        msg = req.query.msg;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, msg);
}

module.exports.sair = function (application, req, res) {
    req.session.destroy();
    res.render('index', { validacao: {} });

}

module.exports.suditos = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.render('index', { validacao: {} });
        return;
    }

    res.render('aldeoes', { validacao: {} });

}

module.exports.pergaminhos = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.render('index', { validacao: {} });
        return;
    }

    // buscar as informacoes no banco de dados
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.getAcao(req.session.usuario, res);

}

module.exports.ordenarAcaoSudito = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.render('index', { validacao: {} });
        return;
    }
    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade é um campo Obrigatório').notEmpty();

    var erro = req.validationErrors();

    if (erro) {
        res.redirect('jogo?msg=A');
        return;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm);
    res.redirect('jogo?msg=S');

}
module.exports.revogarAcao = function(application, req,res){
 var urlQuery = req.query;

 var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

JogoDAO.revogarAcao(urlQuery.idAcao,res);
}