const fp = require('fastify-plugin');

// docker run -d -p 9411:9411 --name zipkin openzipkin/zipkin
async function zipkin(fastify) {

    fastify.register(require('@fastify/zipkin'), {
        serviceName: 'my-service-name',
        servicePort: 3000,
        httpReporterUrl: 'http://localhost:9411/api/v2/spans'
    })
}

module.exports = fp(zipkin);