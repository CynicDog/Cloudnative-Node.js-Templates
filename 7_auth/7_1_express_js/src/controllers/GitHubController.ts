import { Request, Response } from "express";
import axios from "axios";
import { useMiddleware } from "../decorators/LogDecorator";

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;

const REDIRECT_URI = "http://localhost:3000/api/auth/callback";
const GITHUB_API_URL = "https://api.github.com";
const OAUTH_URL = "https://github.com/login/oauth/authorize";
const OAUTH_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";

// GitHubController to handle OAuth2 flow
export class GithubController {

    // Middleware for logging the request URL
    @useMiddleware((req, res, next) => {
        console.log(`Request URL: ${req.url}`);
        next();
    })
    async signIn(req: Request, res: Response) {
        const state = generateRandomString(16);
        const authorizationUri = `${OAUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=read:user,user:email`;

        res.cookie('state', state, { httpOnly: true });
        res.redirect(authorizationUri);
    }

    @useMiddleware((req, res, next) => {
        console.log(`Request URL: ${req.url}`);
        next();
    })
    async callback(req: Request, res: Response) {
        const { code, state } = req.query;

        // Validate the state parameter to prevent CSRF attacks
        const storedState = req.cookies['state'];
        if (!storedState || storedState !== state) {
            return res.status(400).send({ error: "State mismatch" });
        }

        try {
            // Get the access token from GitHub
            const tokenResponse = await axios.post(
                OAUTH_ACCESS_TOKEN_URL,
                new URLSearchParams({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code: code as string,
                    redirect_uri: REDIRECT_URI,
                }),
                { headers: { Accept: 'application/json' } }
            );

            const { access_token } = tokenResponse.data;

            // Get user info from GitHub using the access token
            const userResponse = await axios.get(`${GITHUB_API_URL}/user`, {
                headers: { Authorization: `Bearer ${access_token}` },
            });

            const userInfo = userResponse.data;

            console.log(userInfo);

            // Send back user info or redirect to your app
            res.send({
                user: {
                    username: userInfo.login,
                    avatar_url: userInfo.avatar_url,
                    profile_url: userInfo.html_url,
                },
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).send({ error: "GitHub OAuth2 callback failed", details: err.message });
            } else {
                res.status(500).send({ error: "GitHub OAuth2 callback failed", details: "Unknown error" });
            }
        }
    }
}

// Helper function to generate random strings for OAuth2 state parameter
function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
