// importar as configuracoes do servicor
var app = require('./config/server');

// porta do servidor
var server = app.listen(80, function () {
    console.log('Servidor Online');
});


var io = require('socket.io').listen(server);
// io torna-se variavel global
app.set('io', io);

// criar a conecxao por websocket
io.on('connection', function (socket) {
    console.log('Usuario Connectou');

    socket.on('disconnect', function () {
        console.log('Usuario desconectou');
    })

    socket.on('msgParaServidor', function (data) {
        //emitir a nossa mensagem apenas para mim
        socket.emit('msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            });
        // emitir a mensagem para todos do Chat
        socket.broadcast.emit('msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            });
        // atualizar lista de participantes

        if(parseInt(data.apelidoInserido) ==0){
        socket.emit('participantesParaCliente',
            {
                apelido: data.apelido
            });
        
        socket.broadcast.emit('participantesParaCliente',
            {
                apelido: data.apelido
            });
        }
    });
    
});