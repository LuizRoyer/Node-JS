/*
test.only //Executa Apenas este teste
test.skip // Teste Nao é executado

*/
import 'jest';
import * as request from 'supertest';


let address: string = (<any>global).address;

test('get / users', () => {

    return request(address)
        .get('/users')
        .then(response => {
            expect(response.status).toBe(200); // Valida retorno status 200
            expect(response.body.items).toBeInstanceOf(Array); // Espera receber um Array como resposta
        }).catch(fail);

});


test('post /users', () => {
    return request(address)
        .post('/users')
        .send({
            name: 'name1',
            email: 'usuario1@email.com',
            password: '123456',
            cpf: '789.523.010-72'
        })
        .then(response => {
            expect(response.status).toBe(200); // Valida retorno status 200
            expect(response.body._id).toBeDefined(); //Valida se gerou um Id 
            expect(response.body.name).toBe('name1'); //Valida se o nome esta Igual ao Enviado
            expect(response.body.email).toBe('usuario1@email.com'); //Valida se o Email esta Igual ao Enviado
            expect(response.body.cpf).toBe('789.523.010-72'); //Valida se o Cpf esta Igual ao Enviado
            expect(response.body.password).toBeUndefined(); //Valida se o password vem em Branco
        }).catch(fail);
});

test('post /users Name not Found', () => {
    return request(address)
        .post('/users')
        .send({
            name: '',
            email: 'usuario1@email.com',
            password: '123456'

        })
        .then(response => {
            expect(response.status).toBe(400); // Valida retorno status 400          
            expect(response.body._message).toBe('User validation failed');
        }).catch(fail);
});

test('post /users Email not Found', () => {
    return request(address)
        .post('/users')
        .send({
            name: 'aaas1223',
            email: '',
            password: '123456'

        })
        .then(response => {
            expect(response.status).toBe(400); // Valida retorno status 400          
            expect(response.body.message).toContain('email` is required');
        }).catch(fail);
});

test('post /users Password minimum allowed length (6)', () => {
    return request(address)
        .post('/users')
        .send({
            name: 'aaas1223',
            email: 'aaas1223@email.com',
            password: '0'

        })
        .then(response => {
            expect(response.status).toBe(400); // Valida retorno status 400          
            expect(response.body.message).toContain('minimum allowed length (6)');
        }).catch(fail);
});

test('get /users/aaaa - User Not Found', () => {
    return request(address)
        .get('/users/aaaaa')
        .then(response => {
            expect(response.status).toBe(404); // Valida retorno status 404
        }).catch(fail);

});

test('patch /users/:id', () => {
    return request(address)
        .post('/users')
        .send({
            name: 'name2',
            email: 'usuario2@email.com',
            password: '023456'
        })
        .then(response => request(address)
            .patch(`/users/${response.body._id}`)
            .send({
                name: 'usuario-2 -path'
            }))
        .then(response => {
            expect(response.status).toBe(200); // Valida retorno status 200
            expect(response.body._id).toBeDefined(); //Valida se gerou um Id 
            expect(response.body.name).toBe('usuario-2 -path'); //Valida se o nome esta Igual ao Enviado
            expect(response.body.email).toBe('usuario2@email.com'); //Valida se o Email esta Igual ao Enviado
            expect(response.body.password).toBeUndefined(); //Valida se o password vem em Branco
        })
        .catch(fail);
});
