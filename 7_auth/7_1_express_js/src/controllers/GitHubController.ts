import { Request, Response } from "express";
import { authenticate } from "../decorators/AuthDecorator";
import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

export class GitHubController {
    @authenticate()
    async getRepositories(req: Request, res: Response) {
        try {
            const user = req.user;

            // Get user info from GitHub using the access token
            const repoResponse = await axios.get(`${GITHUB_API_URL}/users/${user?.username}/repos`, {
                headers: { Authorization: `Bearer ${user?.ghAccessToken}` },
            });

            if (user) {
                res.send({
                    username: user.username,
                    repositories: repoResponse.data
                });
            }
        } catch (error) {
            console.error("Error in getUsername:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
}
