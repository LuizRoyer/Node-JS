
var app = require('./config/server');

//var rotaNoticias = require('./app/routes/noticias')(app);

//var rotaHome = require('./app/routes/home')(app);

//var rotaTecnologia = require('./app/routes/tecnologia')(app);

//var rotaFormulario_inclusao_noticia = require('./app/routes/formulario_inclusao_noticia')(app);

//app.get('/',function(req,res){
//    res.send("<html> <body> Portal de Notícias </body></html>")
//});

//app.get('/tecnologia',function(req,res){
//   res.send("<html> <body> Notícias de Tecnologia </body></html>")
//});





app.listen(3000, function () {
    console.log('Servidor rodando');
});