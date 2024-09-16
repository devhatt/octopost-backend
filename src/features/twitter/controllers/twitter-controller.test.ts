import type { NextFunction, Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import type { AuthorizeTwitterService } from '@/features/twitter/services/authorize-twitter-service';
import type { LoginTwitterService } from '@/features/twitter/services/login-twitter-service';
import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';

import { TwitterController } from './twitter-controller';

describe('[Controller] Twitter', () => {
  let authorizeTwitterService: AuthorizeTwitterService;
  let loginTwitterService: LoginTwitterService;
  let authController: TwitterController;
  let error: HttpError;

  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = mockDeep<Request>();

    res = {
      json: vi.fn(),
      send: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    next = vi.fn() as unknown as NextFunction;

    authorizeTwitterService = mock<AuthorizeTwitterService>({
      execute: vi.fn(),
    });
    loginTwitterService = mock<LoginTwitterService>({
      execute: vi.fn(),
    });
    authController = new TwitterController(
      authorizeTwitterService,
      loginTwitterService
    );
    error = new HttpError(HttpStatusCode.serverError, 'error');
  });

  describe('callback', () => {
    it('should be return code', async () => {
      const spyAuthorizeTwitter = vi
        .spyOn(authorizeTwitterService, 'execute')
        .mockReturnThis();
      req.query = { code: '123', state: '123' };
      await authController.callback(req, res, next);
      expect(spyAuthorizeTwitter).toHaveBeenCalledWith({
        code: '123',
        state: '123',
      });
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should be return a URL link on successful login', () => {
      vi.spyOn(loginTwitterService, 'execute').mockReturnValue('url');
      authController.login(req, res, next);

      expect(res.json).toHaveBeenCalledWith('url');
    }),
      it('should be return a error', () => {
        vi.spyOn(loginTwitterService, 'execute').mockImplementation(() => {
          throw error;
        });

        authController.login(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
      });
  });
});
