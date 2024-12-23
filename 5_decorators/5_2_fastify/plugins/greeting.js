const fp = require('fastify-plugin');

async function greetingPlugin(fastify) {

    // Defines the property upfront
    fastify.decorateRequest('user', '');
    // Populate the property
    fastify.addHook('preHandler', (req, reply, done) => {
        req.user = "cynicdog";
        done();
    })

    // Defines the property with reference type
    fastify.decorateRequest('loc')
    // Populate the property
    fastify.addHook('onRequest', async (req, reply) => {
        req.loc = {
            country: "Republic Of Korea",
            city: "Seoul"
        }
    })
}

module.exports = fp(greetingPlugin);