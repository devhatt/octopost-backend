import type { NextFunction, Request, Response } from 'express';
import { vi } from 'vitest';

export const mockJwtAuth = vi.fn(
  (_req: Request, _res: Response, next: NextFunction) => next()
);

vi.mock('@/middlewares/auth/auth-jwt-factory', () => ({
  authJwtFactory: () => ({
    authJwt: {
      jwtAuth: mockJwtAuth,
    },
  }),
}));

export const mockRequest = (
  path: string,
  headers: { [key: string]: string } = {}
): Request =>
  ({
    headers,
    path,
  }) as unknown as Request;

export const mockResponse = (): Response =>
  ({
    json: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
  }) as unknown as Response;

export const mockNext = vi.fn() as unknown as NextFunction;
