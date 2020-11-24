
import * as jestCli  from'jest-cli';
import 'jest';
import * as request from 'supertest';
import { environment } from './common/environment';
import { usersRouter } from './users/users.router';
import { Server } from './server/server';
import { User } from './users/users.model';
import { reviewsRouter } from './reviews/reviews.router';
import { Review } from './reviews/reviews.model';

let server: Server;
let address: string;
//Preparar um cenario para nao popular o banco com os lixos de teste


const beforeAlltTests = () => {

    environment.db.url = process.env.BD_URL || 'mongodb+srv://sys:sys@cluster0.crr6g.mongodb.net/RESTAURANT_test?retryWrites=true&w=majority';
    environment.server.port = process.env.SERVER_PORT || 3001;
    address = `http://localhost:${environment.server.port}`;
    server = new Server();
    return server.bootstrap(
        [   usersRouter,
            reviewsRouter
        ])
        .then(() => User.remove({}).exec())
        .then(() => Review.remove({}).exec())
        
};

//Para no final Matar a conexao com o Banco
const afterAllTests = () => {
    return server.shutdown();
};



beforeAlltTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error);