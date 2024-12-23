import { Request, Response } from "express";
import { useMiddleware } from "../decorators/decorators";

// Define a controller class
export class MyController {
    // Use the middleware decorator to apply middleware
    @useMiddleware((req, res, next) => {
        console.log(`Request URL: ${req.url}`);
        res.locals.decoratedMessage = "Middleware applied!";
        next();
    })
    getHandler(req: Request, res: Response) {
        res.send({
            message: res.locals.decoratedMessage || "No middleware message",
            data: "Hello, world!",
        });
    }
}
