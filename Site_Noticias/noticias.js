var http = require('http');

// criar um servidor e escutar a resposta sem Express
var server = http.createServer(function (req, res) {
    var categoria = req.url;

    if (categoria == '/tecnologia') {
        res.end("<html> <body> Portal de Noticias de Tecnologia </body> </html> ");
    } else if (categoria == '/moda') {
        res.end("<html> <body> Portal de Noticias de Moda </body> </html> ");
    } else {
        res.end("<html> <body> Portal de Noticias</body> </html> ");
    }

});

server.listen(3000);