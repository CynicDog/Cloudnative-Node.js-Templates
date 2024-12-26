const fp = require('fastify-plugin');

async function redis(fastify) {

    fastify.register(require('@fastify/redis'), {
        host: '127.0.0.1'
    })

    fastify.get('/foo', (req, reply) => {
        const { redis } = fastify
        redis.get(req.query.key, (err, val) => {
            reply.send(err || { val: val})
        })
    })

    fastify.post('/foo', (req, reply) => {
        const { redis } = fastify
        redis.set(req.body.key, req.body.value, (err) => {
            reply.send(err || { status: 'ok' })
        })
    })
}

module.exports = fp(redis);