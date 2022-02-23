'use strict'

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const co = require('co')
const { expect } = Code;
const { describe, test } = exports.lab = Lab.script();


let server = require('../')


describe('GET /', () => {

    test('returns Hello World', () => {
        server.inject({
            method: 'GET',
            url: '/'
        }).then(res => {
            expect(res.statusCode).to.equal(200)
            expect(res.result).to.equal('Hello World!')
        })
    });

    test('Test With CO', co.wrap(function* () {
        let res = yield server.inject({
            method: 'GET',
            url: '/'
        })

        expect(res.statusCode).to.equal(200)
        expect(res.result).to.equal('Hello World!')
    }))
});