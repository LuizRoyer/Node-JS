

/*projeto
npm init -y 
npm i restify@6.3.4 -D -E  para lidar um requisicao HTTP
npm i @types/restify@5.0.6 -D -E  para lidar um requisicao HTTP
tsc -w  para ficar observando mudanças no script 
nodemon dist/main.js  para ficar observando mudanças no diretorio 

-- Usar Banco de Dados MongoDB
npm i mongoose -P -E 
npm i @types/mongoose -D -E
banco :mongodb+srv://sys:sys@cluster0.crr6g.mongodb.net/RESTAURANT?retryWrites=true&w=majority

npm i restify-errors@5.0.0  -P -E  // para deixar o erro mais verboso
npm i @types/restify-errors@4.3.2 -D -E


npm i bcrypt-P -E  // criptografar senhas
npm i  @types/bcrypt -D -E
npm install bcrypt

-- teste Unitarios 
npm i jest@22.4.2 ts-jest@22.0.4 typescript@2.6.2 supertest@3.0.0 @types/jest@22.1.2 @types/supertest@2.0.4 -D -E
npm i ts-node@5.0.1 jest-cli@22.4.2 -D -E

-- npm test  // roda os teste
*/
import { Server } from './server/server';
import { usersRouter } from './users/users.router';
import { restaurantsRouter } from './restaurants/restaurants.router';
import { reviewsRouter } from './reviews/reviews.router';

const myRouters = [usersRouter, restaurantsRouter, reviewsRouter];

const server = new Server();

server.bootstrap(myRouters).then(server => {
    console.log('Server is listening on: ', server.application.address());

}).catch(error => {
    console.log('Server failed to start');
    console.log(error);
    process.exit(1);
});
