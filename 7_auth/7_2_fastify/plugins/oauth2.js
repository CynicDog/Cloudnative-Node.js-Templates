const fp = require('fastify-plugin');
const oauthPlugin = require('@fastify/oauth2');
const axios = require('axios');

async function GitHubOauth2Plugin(fastify) {

    fastify.register(require('@fastify/cookie'), {
        secure: true,
        sameSite: 'none'
    })

    fastify.register(oauthPlugin, {
        name: "GitHubOAuth2",
        credentials: {
            client: {
                id: fastify.config.clientId,
                secret: fastify.config.clientSecret
            },
            auth: oauthPlugin.GITHUB_CONFIGURATION
        },
        callbackUri: fastify.config.callbackUri,
    });

    fastify.get('/sign-in', {}, async (req, reply) => {
        fastify.GitHubOAuth2.generateAuthorizationUri(
            req,
            reply,
            (err, authorizationEndpoint) => {
                if (err) {
                    console.error(err);
                    reply.status(500).send('Internal Server Error');
                    return;
                }
                const state = new URL(authorizationEndpoint).searchParams.get('state');

                reply.setCookie('state', state, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 5,
                    sameSite: 'none',
                    path: '/'
                });
                reply.redirect(authorizationEndpoint);
            }
        );
    });

    fastify.get('/callback', async (request, reply) => {

        const { redis, jwt } = fastify
        const { code, state } = request.query;

        // Validate the state parameter to prevent CSRF attacks
        const storedState = request.cookies['state'];
        if (!storedState || storedState !== state) {
            reply.status(400).send({ error: "State mismatch" });
            return;
        }

        try {
            // Get the access token from GitHub using the code
            const tokenResponse = await axios.post(
                'https://github.com/login/oauth/access_token',
                new URLSearchParams({
                    client_id: fastify.config.clientId,
                    client_secret: fastify.config.clientSecret,
                    code: code,
                    redirect_uri: fastify.config.callbackUri,
                }),
                { headers: { Accept: 'application/json' } }
            );

            const { access_token } = tokenResponse.data;

            const userResponse = await axios.get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${access_token}` },
            });
            const userInfo = userResponse.data;

            // // Persist the access token in Redis
            await redis.set(`user:${userInfo.login}:github_access_token`, access_token);

            // Create a JWT for the app user (the "principal" identifier)
            const userPayload = { username: userInfo.login };
            const appToken = jwt.sign(userPayload, fastify.config.jwtSecret, { expiresIn: '3h' });

            // // Persist the user token issued by the backend server
            await redis.set(`user:${userInfo.login}:app_user_token`, appToken);

            // Redirect the user to the frontend with the app token
            reply.redirect(`http://${fastify.config.frontendHost}:${fastify.config.frontendPort}?user_token=${appToken}`);

        } catch (err) {
            console.error(err);
            reply.status(500).send({ error: "GitHub OAuth2 callback failed", details: err.message });
        } finally {
            // Optionally clear the state cookie after processing
            reply.clearCookie('oauth_state');
        }
    });
}

module.exports = fp(GitHubOauth2Plugin);
