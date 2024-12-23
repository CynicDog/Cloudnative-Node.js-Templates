import express, { Request, Response, NextFunction } from "express";
import { MyController } from "./controllers/controllers";

const app = express();
const PORT = 3000;

// Create an instance of the controller
const myController = new MyController();

// Register the controller's route
app.get("/", (req, res) =>
    myController.getHandler(req, res)
);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
