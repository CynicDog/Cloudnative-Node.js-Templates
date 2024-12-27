const fp = require('fastify-plugin');

// docker run -d -p 6379:6379 --name redis redis
async function redis(fastify) {

    fastify.register(require('@fastify/redis'), {
        host: fastify.config.redisHost
    })
}

module.exports = fp(redis);