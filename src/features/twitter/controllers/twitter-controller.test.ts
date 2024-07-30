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
    mockLogger,
    next,
    req,
    res,
    twitterServiceMock,
  };
};

describe('[Controller] Twitter', () => {
  describe('callback', async () => {});

  describe('login', async () => {});
});
