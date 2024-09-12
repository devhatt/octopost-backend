import type { NextFunction, Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import { HttpError } from '@/shared/errors/http-error';
import type { Logger } from '@/shared/infra/logger/logger';
import { HttpStatusCode } from '@/shared/protocols/http-client';
import { loggerMock } from '@/shared/test-helpers/mocks/logger.mock';
import { accountRepositoryMock } from '@/shared/test-helpers/mocks/repositories/account-repository.mock';
import { tokenRepositoryMock } from '@/shared/test-helpers/mocks/repositories/token-repository.mock';

import { AuthorizeTwitterService } from '../services/authorize-twitter-service';
import { LoginTwitterService } from '../services/login-twitter-service';
import type { TwitterService } from '../services/twitter-service';
import { TwitterController } from './twitter-controller';

describe('[Controller] Twitter', () => {
  let mockLogger: Logger;
  let twitterServiceMock: TwitterService;
  let authorizeTwitterService: AuthorizeTwitterService;
  let authController: TwitterController;
  let req: Request;
  let res: Response;
  let next: NextFunction;
  beforeEach(() => {
    mockLogger = mock<Logger>(loggerMock);

    twitterServiceMock = mock<TwitterService>({
      getTwitterOAuthToken: vi.fn(),
      getTwitterUser: vi.fn(),
    });


  const loginTwitterService = mock<LoginTwitterService>(
    new LoginTwitterService()
  );

  const authController = new TwitterController(
    authorizeTwitterService,
    loginTwitterService
  );

    authController = new TwitterController(authorizeTwitterService);


  return {
    authController,
    authorizeTwitterService,
    loginTwitterService,
    mockLogger,
    next,
    req,
    res,
    twitterServiceMock,
  };
};
    req = mockDeep<Request>();

    res = {
      json: vi.fn(),
      send: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    next = vi.fn() as unknown as NextFunction;
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
    it('return a URL link on successful login', () => {
      const { authController, loginTwitterService, next, req, res } = makeSut();

      req.headers.authorization = 'Bearer token';

      const serviceSpy = vi
        .spyOn(loginTwitterService, 'execute')
        .mockReturnValue('url');
      authController.login(req, res, next);

      expect(serviceSpy).toHaveBeenCalledWith({
        authorization: 'Bearer token',
      });
      expect(res.json).toHaveBeenCalledWith('url');
    }),
      it('should return 401 if authorization header is missing', () => {
        const { authController, next, req, res } = makeSut();

        req.headers.authorization = undefined;
        const error = new HttpError(HttpStatusCode.badRequest, 'Unauthorized');

        authController.login(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
      });
  });
});
