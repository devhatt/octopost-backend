import type { Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import { HttpError } from '@/shared/errors/http-error';
import { JWTHelper } from '@/shared/infra/jwt/jwt';
import { authRepositoryMock } from '@/shared/test-helpers/mocks/repositories/auth-repository.mock';

import { AuthLoginService } from '../services/auth-login-service';
import { AuthController } from './auth-controller';

const makeSut = () => {
  const jwtMock = mock<JWTHelper>(new JWTHelper('secret'));

  const loginServiceMock = mock<AuthLoginService>(
    new AuthLoginService(
      authRepositoryMock,
      {
        compare: vi.fn(),
        encrypt: vi.fn(),
      },
      jwtMock
    )
  );

  const authController = new AuthController(loginServiceMock);

  const req = mockDeep<Request>();
  const res = {
    json: vi.fn(),
    send: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn();

  return {
    authController,
    jwtMock,
    loginService: loginServiceMock,
    next,
    req,
    res,
  };
};

describe('[Controllers] AuthController', () => {
  describe('Login', () => {
    it('return token with success', async () => {
      const { authController, jwtMock, loginService, next, req, res } =
        makeSut();

      const body = {
        password: 'password',
        username: 'username',
      };

      req.body = body;

      const token = jwtMock.createToken({ userId: '1' });

      const loginServiceSpy = vi
        .spyOn(loginService, 'execute')
        .mockResolvedValue({
          token,
        });

      await authController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token });
      expect(loginServiceSpy).toHaveBeenCalledWith(body);
    });

    it('should call next when an service error occurs', async () => {
      const { authController, loginService, next, req, res } = makeSut();

      const body = {
        password: 'password',
        username: 'username',
      };
      req.body = body;

      const error = new HttpError(500, 'error');

      vi.spyOn(loginService, 'execute').mockRejectedValueOnce(error);

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(error.toJSON()).toStrictEqual({ code: 500, message: 'error' });
    });
    it('calls next when validation fails', async () => {
      const { authController, next, req, res } = makeSut();
      req.body = {
        password: 'password',
        username: 1,
      };

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
