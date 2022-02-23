'use strict';

const Hapi = require('@hapi/hapi');
const router = require('./routers')
const init = async () => {

    const server = module.exports = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(router);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();