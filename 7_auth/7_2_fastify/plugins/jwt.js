const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');

async function jwtPlugin(fastify, options) {
    fastify.decorate('jwt', jwt);
}

module.exports = fp(jwtPlugin);
