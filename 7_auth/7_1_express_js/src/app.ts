import express from "express";
import { RedisController } from "./controllers/RedisController";
import {GithubController} from "./controllers/GitHubController"; // Import the RedisController class

const app = express();
const PORT = 3000;

// Create an instance of the RedisController
const redisController = new RedisController();
const githubController = new GithubController();

app.use(express.json());

// http :3000/redis/foo?key=myKey
app.get("/redis/foo", (req, res) =>
    redisController.getFoo(req, res)
);

// http POST :3000/redis/foo key=myKey value=MyValue
app.post("/redis/foo", (req, res) =>
    redisController.postFoo(req, res)
);

app.get("/sign-in", (req, res) =>
    githubController.signIn(req, res)
)

app.get("/callback", (req, res) =>
    githubController.callback(req, res)
)

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
