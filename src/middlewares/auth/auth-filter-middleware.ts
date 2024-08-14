import type { NextFunction, Request, Response } from 'express';

import { AuthFilter } from '@/middlewares/auth/auth-filter';
import { authJwtFactory } from '@/middlewares/auth/auth-jwt-factory';

export const authFilterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authJwt } = authJwtFactory();
  const { filter } = new AuthFilter(authJwt);

  Promise.resolve(filter(req, res, next));
};
