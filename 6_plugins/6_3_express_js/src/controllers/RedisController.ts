import { Request, Response } from "express";
import Redis, { RedisKey } from "ioredis";
import { useMiddleware } from "../decorators/LogDecorator";

// docker run -d -p 6379:6379 --name redis redis
// Create a new Redis client
const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

export class RedisController {

    // Middleware for logging the request URL
    @useMiddleware((req, res, next) => {
        console.log(`Request URL: ${req.url}`);
        next();
    })
    async getFoo(req: Request, res: Response) {
        const { key } = req.query;

        // Ensure that key is a valid RedisKey type (string or Buffer)
        if (typeof key !== 'string') {
            res.status(400).send({ error: 'Key must be a string' });
        }

        try {
            const val = await redis.get(key as RedisKey);
            res.send({ val: val || null });
        } catch (err) {
            res.status(500).send({ error: 'Error retrieving from Redis', details: err });
        }
    }

    @useMiddleware((req, res, next) => {
        console.log(`Request URL: ${req.url}`);
        next();
    })
    async postFoo(req: Request, res: Response) {
        const { key, value } = req.body;

        // Ensure key and value are both strings
        if (typeof key !== 'string' || typeof value !== 'string') {
            res.status(400).send({ error: 'Key and value must be strings' });
        }

        try {
            await redis.set(key as RedisKey, value);
            res.send({ status: 'ok' });
        } catch (err) {
            res.status(500).send({ error: 'Error setting value in Redis', details: err });
        }
    }
}
