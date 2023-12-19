import { Request, Response } from 'express';

export const getHello = async (req: Request, res: Response) => {
  try {
    res.json({
      message: "Hello World!",
    });
  } catch (err) {
    console.error(err);
  }
}