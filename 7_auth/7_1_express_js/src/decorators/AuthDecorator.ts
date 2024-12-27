import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: 6379,
});

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export function authenticate() {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {

            const authHeader = req.headers["authorization"];
            if (!authHeader) {
                return res.status(401).send({ error: "No authorization header provided" });
            }

            const token = authHeader.startsWith("Bearer ")
                ? authHeader.slice(7) // Remove "Bearer " prefix
                : null;

            if (!token) {
                return res.status(401).send({ error: "Invalid authorization format" });
            }

            try {
                const decoded = jwt.verify(token, JWT_SECRET) as { username: string };

                // Validate token against Redis
                const storedToken = await redis.get(
                    `user:${decoded.username}:app_user_token`
                );
                if (storedToken !== token) {
                    return res.status(401).send({ error: "Invalid token" });
                }

                // Attach user info to the request
                req.user = decoded;
                await originalMethod.call(this, req, res, next); // Call the original method
            } catch (err) {
                return res.status(403).send({ error: "Invalid or expired token" });
            }
        };

        return descriptor;
    };
}
