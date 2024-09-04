import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
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
    it('returns code', async () => {
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
    it('return URLs when the token is valid', async () => {
      const { authController, next, req, res } = makeSut();

      req.headers.authorization =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJ1c2VySWQiOiIxMjM0NSIsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTY2NTMzMjM0NCwiZXhwIjoxNjY1MzM1OTQ0fQ.S5ReMBrQqVAD6UCD6Q9Vj9fK9J-Q9r_a9f3zRmpDsxM';

      const mockPayload = {
        name: 'John Doe',
        userId: '12345',
        username: 'johndoe',
      };

      vi.spyOn(jwt, 'verify').mockReturnValue(mockPayload as any);
      process.env.TWITTER_CLIENT_ID = 'mockClientId123';

      const expectedUrl = `https://twitter.com/i/oauth2/authorize?client_id=mockClientId123&code_challenge=-a4-ROPIVaUBVj1qqB2O6eN_qSC0WvET0EdUEhSFqrI&code_challenge_method=S256&redirect_uri=http%3A%2F%2Fwww.localhost%3A3000%2Fapi%2Ftwitter%2Fcallback&response_type=code&state=${mockPayload.userId}&scope=tweet.write%20tweet.read%20users.read`;

      await authController.login(req, res, next);

      expect(res.json).toHaveBeenCalledWith(expectedUrl);
    });

    it('returns 401 when token is invalid', () => {
      const { authController, next, req, res } = makeSut();

      req.headers.authorization = undefined;

      authController.login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    });
  });
});
