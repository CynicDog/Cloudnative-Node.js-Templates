'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.decorate('config', {
    redisHost: process.env.REDIS_HOST || '127.0.0.1',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUri: process.env.CALLBACK_URI || 'http://localhost:3000/callback',
    frontendHost: process.env.FRONTEND_HOST || 'localhost',
    frontendPort: process.env.FRONTEND_PORT || 4173,
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  });

  console.log(fastify.config);

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

module.exports.options = options
