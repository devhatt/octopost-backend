import type { Request, Response } from 'express';
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

const makeSut = () => {
  const mockLogger: Logger = mock<Logger>(loggerMock);
  const twitterServiceMock = mock<TwitterService>({
    getTwitterOAuthToken: vi.fn(),
    getTwitterUser: vi.fn(),
  });
  const authorizeTwitterService = mock<AuthorizeTwitterService>(
    new AuthorizeTwitterService(
      mockLogger,
      twitterServiceMock,
      accountRepositoryMock,
      tokenRepositoryMock
    )
  );

  const loginTwitterService = mock<LoginTwitterService>(
    new LoginTwitterService({
      secretKey: 'secret_key',
    })
  );

  const authController = new TwitterController(
    authorizeTwitterService,
    loginTwitterService
  );

  const req = mockDeep<Request>();
  const res = {
    json: vi.fn(),
    send: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn();
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
describe('[Controller] Twitter', () => {
  describe('callback', () => {
    it('should be return code', async () => {
      const { authController, authorizeTwitterService, next, req, res } =
        makeSut();
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
        const error = new HttpError(HttpStatusCode.badRequest, 'Unauthorized');

        req.headers.authorization = undefined;

        authController.login(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
      });
  });
});
