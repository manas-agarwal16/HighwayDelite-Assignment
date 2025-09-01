import { Request, Response, NextFunction, RequestHandler } from "express";

// Higher-order function to handle async errors in Express routes
const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export { asyncHandler };
