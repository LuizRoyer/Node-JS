module.exports = function (application) {
	application.get('/', function (req, res) {
		//acessar o controller Index
		application.app.controllers.index.index(application, req, res);
	});

	application.post('/autenticar',function(req,res){
		application.app.controllers.index.autenticar(application,req,res);
	})
	application.get('/cadastrar', function (req, res) {        
        application.app.controllers.cadastro.cadastro(application, req, res);
    });
}