import type { NextFunction, Request, Response } from 'express';

import type { AuthenticationJWT } from '@/middlewares/auth/auth-jwt';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { publicRoutes } from '@/shared/routes/public-routes';

export class AuthFilter {
  filter: AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (publicRoutes.includes(req.path)) {
      return next();
    }
    this.authJwt.jwtAuth(req, res, next);
  };

  constructor(private readonly authJwt: AuthenticationJWT) {}
}
