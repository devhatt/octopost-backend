import { faker } from '@faker-js/faker';
import { mock } from 'vitest-mock-extended';

import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import type { TokenRepository } from '@/features/account/repositories/token-repository/token-repository';
import type { Logger } from '@/shared/infra/logger/logger';
import { loggerMock } from '@/shared/test-helpers/mocks/logger.mock';

import type { TwitterTokenResponse } from '../models/twitter-models';
import { AuthorizeTwitterService } from './authorize-twitter-service';
import type { TwitterService } from './twitter-service';

describe('[Service] Authorize Twitter', () => {
  let sut: AuthorizeTwitterService;
  let mockLogger: Logger;
  let mockTwitterService: TwitterService;
  let mockAccountRepository: AccountRepository;
  let mockTokenRepository: TokenRepository;
  const fakeAccount = {
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
  };

  beforeEach(() => {
    mockLogger = mock<Logger>(loggerMock);

    mockTwitterService = mock<TwitterService>({
      getTwitterOAuthToken: vi.fn(),
      getTwitterUser: vi.fn(),
    });

    mockAccountRepository = mock({
      create: vi.fn(),
      deleteAccountsBySocialMediaId: vi.fn(),
      findAccountsByUserId: vi.fn(),
      getAccountBySocialMedia: vi.fn(),
      getAccounts: vi.fn(),
    });

    mockTokenRepository = mock({
      upsert: vi.fn(),
    });

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

  it('success with account', async () => {
    const spyLogger = vi.spyOn(mockLogger, 'info');

    vi.spyOn(mockTwitterService, 'getTwitterOAuthToken').mockResolvedValueOnce({
      access_token: 'access_token',
      expires_in: 7200,
      scope: '123',
      token_type: 'bearer',
    });

    vi.spyOn(mockTwitterService, 'getTwitterUser').mockResolvedValueOnce({
      id: '123',
      name: 'name',
      username: 'username',
    });

    vi.spyOn(
      mockAccountRepository,
      'getAccountBySocialMedia'
    ).mockResolvedValueOnce(fakeAccount);

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
    expect(mockTokenRepository.upsert).toHaveBeenCalled();
  });

  it('should throw an error if twitterOAuthToken is not returned', async () => {
    const spyLogger = vi.spyOn(mockLogger, 'info');

    vi.spyOn(mockTwitterService, 'getTwitterOAuthToken').mockResolvedValueOnce(
      null as unknown as TwitterTokenResponse
    );

    const input = {
      code: '123',
      state: '123',
    };

    await expect(sut.execute(input)).rejects.toThrowError('Erro');

    expect(spyLogger).toHaveBeenCalledWith(
      'Inicialize authorize twitter service'
    );

    expect(mockTwitterService.getTwitterOAuthToken).toHaveBeenCalledWith(
      input.code
    );
    expect(mockTwitterService.getTwitterUser).not.toHaveBeenCalled();
    expect(
      mockAccountRepository.getAccountBySocialMedia
    ).not.toHaveBeenCalled();
  });

  it('creates account if it does not exist', async () => {
    const spyLogger = vi.spyOn(mockLogger, 'info');

    vi.spyOn(mockTwitterService, 'getTwitterOAuthToken').mockResolvedValueOnce({
      access_token: 'access_token',
      expires_in: 7200,
      scope: '123',
      token_type: 'bearer',
    });

    vi.spyOn(mockTwitterService, 'getTwitterUser').mockResolvedValueOnce({
      id: '123',
      name: 'name',
      username: 'username',
    });

    vi.spyOn(
      mockAccountRepository,
      'getAccountBySocialMedia'
    ).mockResolvedValueOnce(null);

    vi.spyOn(mockAccountRepository, 'create').mockResolvedValueOnce(
      fakeAccount
    );

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
    expect(mockAccountRepository.create).toHaveBeenCalled();
    expect(mockTokenRepository.upsert).toHaveBeenCalled();
  });
});
