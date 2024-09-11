import type { NextFunction, Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import type { Logger } from '@/shared/infra/logger/logger';
import { loggerMock } from '@/shared/test-helpers/mocks/logger.mock';
import { accountRepositoryMock } from '@/shared/test-helpers/mocks/repositories/account-repository.mock';
import { tokenRepositoryMock } from '@/shared/test-helpers/mocks/repositories/token-repository.mock';

import { AuthorizeTwitterService } from '../services/authorize-twitter-service';
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

    authorizeTwitterService = mock<AuthorizeTwitterService>(
      new AuthorizeTwitterService(
        mockLogger,
        twitterServiceMock,
        accountRepositoryMock,
        tokenRepositoryMock
      )
    );

    authController = new TwitterController(authorizeTwitterService);

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
    it('should be return 401', () => {
      req.headers.authorization = undefined;

      authController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    });
  });
});
