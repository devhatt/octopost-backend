import type { Request, Response } from 'express';
import { mockDeep } from 'vitest-mock-extended';

import { authBodySchema } from '../validators/auth-schema';
import { AuthController } from './auth-controller';

const makeSut = () => {
  const authController = new AuthController(undefined);

  const req = mockDeep<Request>();
  const res = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn();

  return {
    authController,
    next,
    req,
    res,
  };
};

describe('[Controllers] AuthController', () => {
  const body = {
    password: 'valid_password',
    username: 'valid_username',
  };

  const { req } = makeSut();

  it('should validate body with correctly params', async () => {
    req.body = body;

    expect(() => authBodySchema.parse(req.body)).not.toThrow();
  });
});
