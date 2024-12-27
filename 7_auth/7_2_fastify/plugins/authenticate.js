'use strict';
const fp = require('fastify-plugin');

async function authenticate(fastify) {

    // Decorate the request object with user
    fastify.decorateRequest('user', null);

    fastify.addHook('preHandler', async (req, reply) => {

        const { redis, jwt } = fastify;

        // Log the URL path to check the route being accessed
        console.log("Request URL:", req.url);

        // Apply authentication filter only to routes that start with '/github/'
        if (!req.url.startsWith('/github/')) {
            return;
        }

        // Check for authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            reply.status(401).send({ error: 'No authorization header provided' });
            return;
        }

        // Extract token from the "Bearer" format
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        if (!token) {
            reply.status(401).send({ error: 'Invalid authorization format' });
            return;
        }

        try {
            const principal = jwt.verify(token, fastify.config.jwtSecret);

            // Validate token against Redis
            const storedToken = await redis.get(`user:${principal.username}:app_user_token`);
            if (storedToken !== token) {
                reply.status(401).send({ error: 'Invalid token' });
                return;
            }

            // Attach user info to request
            principal.ghAccessToken = await redis.get(`user:${principal.username}:github_access_token`);

            req.user = principal;
        } catch (err) {
            reply.status(403).send({ error: 'Invalid or expired token' });
        }
    });
}

module.exports = fp(authenticate);
