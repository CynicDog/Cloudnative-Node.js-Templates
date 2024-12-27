'use strict'
const axios = require('axios');

module.exports = async function (fastify, opts) {

    fastify.get('/github/repositories', async function (request, reply) {
        try {
            const user = request.user;

            if (!user || !user.ghAccessToken) {
                reply.status(401).send({ error: "Unauthorized" });
                return;
            }
            const repoResponse = await axios.get(`https://api.github.com/users/${user.username}/repos`, {
                headers: { Authorization: `Bearer ${user.ghAccessToken}` }
            });
            reply.send({
                username: user.username,
                repositories: repoResponse.data
            });
        } catch (error) {
            console.error("Error in getRepositories:", error);
            reply.status(500).send({ error: "Internal Server Error" });
        }
    });
}
