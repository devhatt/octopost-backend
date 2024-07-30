import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import type { TokenRepository } from '@/features/account/repositories/token-repository/token-repository';
import type { Logger } from '@/shared/infra/logger/logger';
import { loggerMock } from '@/shared/test-helpers/mocks/logger.mock';

import type { AuthorizeTwitterService } from './authorize-twitter-service';
import type { TwitterService } from './twitter-service';

describe('Authorize Twitter Service', () => {
  let sut: AuthorizeTwitterService;
  let loggerSpy: Logger;
  let twitterServiceSpy: TwitterService;
  let accountRepositorySpy: AccountRepository;
  let tokenRepository: TokenRepository;

  beforeEach(() => {
    // sut = new AuthorizeTwitterService(loggerMock);
  });

  it('asd', async () => {});
});
