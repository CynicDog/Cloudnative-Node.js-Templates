import { Request, Response } from "express";
import { authenticate } from "../decorators/AuthDecorator";

export class ProtectedController {
    @authenticate()
    async getSomeResource(req: Request, res: Response) {
        try {
            const user = req.user;
            if (user) {
                res.send({
                    username: user.username,
                    resource: "💎💰"
                });
            }
        } catch (error) {
            console.error("Error in getUsername:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
}
