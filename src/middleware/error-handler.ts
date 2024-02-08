import { Request, Response, NextFunction } from 'express';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let errorMessage = 'Internal Server Error';

  if (err instanceof SyntaxError && 'body' in err) {
    statusCode = 400;
    errorMessage = 'Invalid JSON';
  }

  res.status(statusCode).json({ error: errorMessage });
};