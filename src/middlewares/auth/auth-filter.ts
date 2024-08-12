import type { NextFunction, Request, Response } from 'express';

import { authJwtFactory } from '@/middlewares/auth/auth-jwt-factory';

export const authFilter =
  (authJwtFactoryFn = authJwtFactory) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { authJwt } = authJwtFactoryFn();

    const publicRoutes = ['/api/users', '/api/auth/login'];

    if (publicRoutes.includes(req.path)) {
      return next();
    }
    authJwt.jwtAuth(req, res, next);
  };

export const authFilterMiddleware = authFilter(authJwtFactory);
