import { faker } from '@faker-js/faker';
import { mock } from 'vitest-mock-extended';

import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import type { TokenRepository } from '@/features/account/repositories/token-repository/token-repository';
import type { Logger } from '@/shared/infra/logger/logger';
import { loggerMock } from '@/shared/test-helpers/mocks/logger.mock';

import { AuthorizeTwitterService } from './authorize-twitter-service';
import type { TwitterService } from './twitter-service';

describe('[Service] Authorize Twitter', () => {
  let sut: AuthorizeTwitterService;
  const mockLogger = mock<Logger>(loggerMock);
  const mockTwitterService = mock<TwitterService>();
  const mockAccountRepository = mock<AccountRepository>();
  const mockTokenRepository = mock<TokenRepository>();

  beforeEach(() => {
    sut = new AuthorizeTwitterService(
      mockLogger,
      mockTwitterService,
      mockAccountRepository,
      mockTokenRepository
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('success', async () => {
    const spyLogger = vi.spyOn(mockLogger, 'info');

    mockTwitterService.getTwitterOAuthToken.mockResolvedValueOnce({
      access_token: 'access_token',
      expires_in: 7200,
      scope: '123',
      token_type: 'bearer',
    });

    mockTwitterService.getTwitterUser.mockResolvedValueOnce({
      id: '123',
      name: 'name',
      username: 'username',
    });

    mockAccountRepository.getAccountBySocialMedia.mockResolvedValueOnce({
      avatarUrl: faker.image.avatar(),
      createdAt: faker.date.past(),
      favorite: faker.datatype.boolean(),
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      socialMediaId: faker.number.int(),
      socialMediaUserId: faker.string.uuid(),
      updatedAt: faker.date.recent(),
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
    });

    const input = {
      code: '123',
      state: '123',
    };

    await sut.execute(input);

    expect(spyLogger).toHaveBeenCalledWith(
      'Inicialize authorize twitter service'
    );
    expect(mockTwitterService.getTwitterOAuthToken).toHaveBeenCalledWith(
      input.code
    );
    expect(mockTwitterService.getTwitterUser).toHaveBeenCalledWith(
      'access_token'
    );
    expect(mockAccountRepository.getAccountBySocialMedia).toHaveBeenCalled();
    expect(mockAccountRepository.create).not.toHaveBeenCalled();
  });
});
