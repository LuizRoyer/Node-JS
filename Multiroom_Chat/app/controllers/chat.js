module.exports.IniciaChat = function (application, req, res) {

    var dadosForm = req.body;

    req.assert('apelido', 'Campo Nome é Obrigatorio').notEmpty();
    req.assert('apelido', 'Apelido deve ser maior que 3 caracteres e menor que 16').len(3, 15);

    var erros = req.validationErrors();

    if (erros) {
        res.render('index', { validacao: erros });
        return;
    }

    application.get('io').emit('msgParaCliente',
        {
            apelido: dadosForm.apelido,
            mensagem: 'acabou de entrar no chat'
        });

    res.render('chat',{dadosForm:dadosForm});
}