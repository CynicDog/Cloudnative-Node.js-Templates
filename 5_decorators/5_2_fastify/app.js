'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Attach a new method to the server instance
  fastify.decorate('greet', function() {
    console.log("Hello, World. Greeting from a custom decorator👋.");
  });
  fastify.greet();

  // Attach a none-function values to the server instance
  fastify.decorate('cred', {
    username: 'cynicdog',
    password: 'cynicdog'
  })
  console.log(fastify.cred);

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
