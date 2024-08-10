import type { NextFunction, Request, Response } from 'express';

import { authJwtFactory } from '@/middlewares/auth/auth-jwt-factory';

const { authJwt } = authJwtFactory();

const publicRoutes = ['/api/users', '/api/auth/login'];

export const authFilter = (req: Request, res: Response, next: NextFunction) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  authJwt.jwtAuth(req, res, next);
};
