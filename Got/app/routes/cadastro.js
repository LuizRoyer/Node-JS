module.exports = function (application) {
    
    application.get('/cadastro', function (req, res) {
        //acessar o controller do cadastro
        application.app.controllers.cadastro.cadastro(application, req, res);
    });

    application.post('/cadastrar',function(req, res){
        application.app.controllers.cadastro.cadastrar(application,req,res);
    })
    application.get('/voltar', function (req, res) {	
		application.app.controllers.index.index(application, req, res);
	});

}