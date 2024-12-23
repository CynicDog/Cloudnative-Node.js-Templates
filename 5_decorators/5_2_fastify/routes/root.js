'use strict'

module.exports = async function (fastify, opts) {

  fastify.get('/', async function (req, reply) {
    reply.send(
        `Hello, ${req.user}!\n` +
        `Your credentials are: ${JSON.stringify(await this.cred)}.\n` +
        `Your location is: ${JSON.stringify(req.loc)}.`)
  })
}
