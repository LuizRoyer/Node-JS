'use strict'

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const co = require('co')
const { expect } = Code;
const { describe, test } = exports.lab = Lab.script();


let server = require('..')

describe('POST /user', () => {
    test('create a user', co.wrap(function* () {
        let res = yield server.inject(
            {
                url: '/user',
                method: 'POST',
                payload: {
                    name: 'Luiz', lastName: 'Pereira'
                }
            })
        expect(res.statusCode).to.equal(200)
        expect(res.result).contain('Olá Luiz')
    }))
})