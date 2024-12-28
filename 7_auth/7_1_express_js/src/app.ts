import express from "express";
import cookieParser from "cookie-parser";
import { AuthController } from "./controllers/AuthController";
import { GitHubController } from "./controllers/GitHubController"; 

const app = express();
const PORT = 3000;

const authController = new AuthController();
const githubController = new GitHubController();

app.use(cookieParser());
app.use(express.json());

app.get("/sign-in", (req, res) =>
    authController.signIn(req, res)
)

app.get("/callback", (req, res) =>
    authController.callback(req, res)
)

app.get("/github/repositories", (req, res) =>
    githubController.getRepositories(req, res)
)

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
