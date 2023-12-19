import { Request, Response, NextFunction } from 'express';

export const requestActivity = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`[request]: ${req.method} ${req.url}`);
  next();
}