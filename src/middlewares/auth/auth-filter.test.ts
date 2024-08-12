import type { Request, Response } from 'express';

import { authFilter } from '@/middlewares/auth/auth-filter';

import type { AuthenticationJWT } from './auth-jwt';

const mockJwtAuth: Partial<AuthenticationJWT> = {
  jwtAuth: vi.fn(),
};

const mockAuthJwtFactory = () => ({
  authJwt: mockJwtAuth as AuthenticationJWT,
});

describe('authFilter middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    req = { headers: { authorization: 'Bearer' } };
    res = { json: vi.fn(), status: vi.fn().mockReturnThis() };
    next = vi.fn();
  });

  it('executes next for public routes', () => {
    req = { path: '/api/users' };

    const middleware = authFilter(mockAuthJwtFactory);

    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(mockAuthJwtFactory().authJwt.jwtAuth).not.toHaveBeenCalled();
  });

  it('calls authentication middleware for protected routes', () => {
    req = { path: '/api/protected' };

    const middleware = authFilter(mockAuthJwtFactory);

    middleware(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(mockAuthJwtFactory().authJwt.jwtAuth).toHaveBeenCalled();
  });
});
