import express from "express";
import { RedisController } from "./controllers/RedisController"; // Import the RedisController class

const app = express();
const PORT = 3000;

// Create an instance of the RedisController
const redisController = new RedisController();

app.use(express.json());

// http :3000/redis/foo?key=myKey
app.get("/redis/foo", (req, res) =>
    redisController.getFoo(req, res)
);

// http POST :3000/redis/foo key=myKey value=MyValue
app.post("/redis/foo", (req, res) =>
    redisController.postFoo(req, res)
);

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
