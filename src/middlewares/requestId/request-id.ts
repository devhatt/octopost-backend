import { randomUUID } from 'node:crypto';

import type { NextFunction, Request, Response } from 'express';
import httpContext from 'express-http-context';

export const requestId = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  httpContext.set('requestId', randomUUID());
  next();
};
