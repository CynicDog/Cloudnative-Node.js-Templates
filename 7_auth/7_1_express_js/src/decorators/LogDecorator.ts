import { Request, Response, NextFunction } from "express";

// Define the middleware decorator
export function useMiddleware(
    middleware: (req: Request, res: Response, next: NextFunction) => void
) {
    return function (
        target: any,
        key: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        // Re-assign the descriptor's method to wrap the original method with the middleware
        descriptor.value = function (req: Request, res: Response, next: NextFunction) {
            middleware(req, res, () => {
                originalMethod.call(this, req, res, next);
            });
        };

        return descriptor;
    };
}