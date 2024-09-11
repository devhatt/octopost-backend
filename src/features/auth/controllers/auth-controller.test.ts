import type { NextFunction, Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import { AuthController } from '@/features/auth/controllers/auth-controller';
import { AuthLoginService } from '@/features/auth/services/auth-login-service';
import { HttpError } from '@/shared/errors/http-error';
import { JWTHelper } from '@/shared/infra/jwt/jwt';
import { HttpStatusCode } from '@/shared/protocols/http-client';
import { bcryptAdapteMock } from '@/shared/test-helpers/mocks/bcryptAdapter.mock';
import { authRepositoryMock } from '@/shared/test-helpers/mocks/repositories/auth-repository.mock';

describe('[Controllers] AuthController', () => {
  let jwtMock: JWTHelper;
  let loginServiceMock: AuthLoginService;
  let authController: AuthController;

  let req: Request;
  let res: Response;
  let next: NextFunction;

  let error: HttpError;

  beforeEach(() => {
    jwtMock = mock<JWTHelper>(new JWTHelper('secret'));

    loginServiceMock = mock<AuthLoginService>(
      new AuthLoginService(authRepositoryMock, bcryptAdapteMock, jwtMock)
    );

    authController = new AuthController(loginServiceMock);

    req = mockDeep<Request>();

    res = {
      json: vi.fn(),
      send: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    next = vi.fn() as unknown as NextFunction;

    error = new HttpError(HttpStatusCode.serverError, 'error');
  });

  describe('Login', () => {
    it('return token with success', async () => {
      const body = {
        password: 'password',
        username: 'username',
      };

      req.body = body;

      const token = jwtMock.createToken({
        name: 'John Doe',
        userId: '1',
        username: 'johndoe',
      });

      const loginServiceSpy = vi
        .spyOn(loginServiceMock, 'execute')
        .mockResolvedValue({
          token,
        });

      await authController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token });
      expect(loginServiceSpy).toHaveBeenCalledWith(body);
    });

    it('should call next when an service error occurs', async () => {
      const body = {
        password: 'password',
        username: 'username',
      };

      req.body = body;

      vi.spyOn(loginServiceMock, 'execute').mockRejectedValueOnce(error);

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(error.toJSON()).toStrictEqual({ code: 500, message: 'error' });
    });
    it('calls next when validation fails', async () => {
      req.body = {
        password: 'password',
        username: 1,
      };

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
