import type { NextFunction, Request, Response } from 'express';

import { AuthFilter } from '@/middlewares/auth/auth-filter';
import type { AuthenticationJWT } from '@/middlewares/auth/auth-jwt';

const mockJwtAuth = {
  jwtAuth: vi.fn(),
} as unknown as AuthenticationJWT;

const authFilter = new AuthFilter(mockJwtAuth);

describe('AuthFilter', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = { json: vi.fn(), status: vi.fn().mockReturnThis() };
    next = vi.fn() as unknown as NextFunction;
  });

  it('executes next for public routes', () => {
    req = { path: '/api/users' };

    authFilter.filter(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(mockJwtAuth.jwtAuth).not.toHaveBeenCalled();
  });

  it('calls authentication middleware for protected routes', () => {
    req = { path: '/api/protected' };

    authFilter.filter(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(mockJwtAuth.jwtAuth).toHaveBeenCalled();
  });
});
