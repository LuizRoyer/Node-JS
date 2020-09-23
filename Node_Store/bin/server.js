"use strict"; // força e valida ponto e virgula erros de compilação

const app = require('../src/app');
const http = require("http");
const debug = require("debug")("nodestr:server");

const port = normalizePort(process.env.PORT || "3000");

const server = http.createServer(app);

server.listen(port);
server.on("error", onError); // cuida dos erros
server.on('listening',onListening); // ativa o debug
console.log("API rodando na porta " + port);

// normalizar a porta usar a porta 3000 ou buscar a porta disponivel
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;

  if (port >= 0) return port;

  return false;
}
// Apresentar Erros no servidor
function onError(error) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is alredy in use");
      process.emit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on" + bind);
}
