import type { Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import type { Logger } from '@/shared/infra/logger/logger';
import { loggerMock } from '@/shared/test-helpers/mocks/logger.mock';
import { accountRepositoryMock } from '@/shared/test-helpers/mocks/repositories/account-repository.mock';
import { tokenRepositoryMock } from '@/shared/test-helpers/mocks/repositories/token-repository.mock';

import { AuthorizeTwitterService } from '../services/authorize-twitter-service';
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

  const authController = new TwitterController(authorizeTwitterService);

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
    it('should be return 401', () => {
      const { authController, next, req, res } = makeSut();

      req.headers.authorization = undefined;

      authController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    });
  });
});
