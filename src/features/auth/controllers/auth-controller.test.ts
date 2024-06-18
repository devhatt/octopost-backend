import type { Request, Response } from 'express';
import { mockDeep } from 'vitest-mock-extended';

import { HttpError } from '@/shared/errors/http-error';
import type { Validator } from '@/shared/infra/validator/validator';
import type { Service } from '@/shared/protocols/service';

import { AuthController } from './auth-controller';

const makeSut = () => {
  class ValidatorStub implements Validator {
    public validate(_: any, __: any): boolean {
      return true;
    }
  }

  class AuthServiceStub implements Service {
    public execute(params: any): any {
      return params;
    }
  }

  const validator = new ValidatorStub();
  const authService = new AuthServiceStub();

  const authController = new AuthController(validator, authService);

  const req = mockDeep<Request>();
  const res = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn();

  return {
    authController,
    authService,
    next,
    req,
    res,
    validator,
  };
};

describe('[Controllers] AuthController', () => {
  const body = {
    password: 'valid_password',
    username: 'valid_username',
  };

  const { authController, authService, next, req, res, validator } = makeSut();

  it('should call validator with correctly params', async () => {
    const validateSpy = vi.spyOn(validator, 'validate');

    req.body = body;

    await authController.login(req, res, next);

    expect(validateSpy).toHaveBeenCalledWith(expect.anything(), { body });
  });

  it('should call service with correctly params', async () => {
    const serviceSpy = vi.spyOn(authService, 'execute');

    req.body = body;

    await authController.login(req, res, next);

    expect(serviceSpy).toHaveBeenCalledWith(body);
  });

  it('should response 200 with access token informations', async () => {
    const response = {
      expireAt: '1714237277',
      issuedAt: '1714233677',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    };

    vi.spyOn(authService, 'execute').mockReturnValue(response);

    await authController.login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(response);
  });

  it('should call next when an service error occurs', async () => {
    const error = new HttpError(500, 'error');

    vi.spyOn(authService, 'execute').mockRejectedValueOnce(
      new HttpError(500, 'error')
    );

    await authController.login(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(error.toJSON()).toStrictEqual({ code: 500, message: 'error' });
  });
});
