import { describe, expect, it, vi } from 'vitest';
import { GetUserAccountsService } from './get-user-accounts-service.js';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock.js';

const makeSut = () => {
  const userRepository = {
    create: vi.fn(),
    findById: vi.fn(),
  };

  const accountRepository = {
    getAccounts: vi.fn(),
  };

  const getUserAccountsService = new GetUserAccountsService(
    userRepository,
    accountRepository
  );

  return { accountRepository, getUserAccountsService, userRepository };
};

describe('GetUserAccountsService', () => {
  it('should call userRepository.findById with correct id', async () => {
    const { getUserAccountsService, userRepository } = makeSut();
    const user = UserMock.create();

    userRepository.findById.mockResolvedValueOnce(null);

    const response = getUserAccountsService.execute(user);

    await expect(response).rejects.toThrowError('User not found');

    expect(userRepository.findById).toHaveBeenCalledWith(user.id);
  });

  it('should call accountRepository.getAccounts with correct user id', async () => {
    const { accountRepository, getUserAccountsService, userRepository } =
      makeSut();
    const user = UserMock.create();

    userRepository.findById.mockResolvedValueOnce(user);

    await getUserAccountsService.execute(user);

    expect(accountRepository.getAccounts).toHaveBeenCalledWith(user.id);
  });

  it('should throw an error if userRepository.findById returns null', async () => {
    const { getUserAccountsService, userRepository } = makeSut();
    const user = UserMock.create();
    userRepository.findById.mockResolvedValueOnce(null);

    const response = getUserAccountsService.execute(user);

    await expect(response).rejects.toThrowError('User not found');
  });

  it('should not throw an error if userRepository.findById returns a user', async () => {
    const { getUserAccountsService, userRepository } = makeSut();
    const user = UserMock.create();
    userRepository.findById.mockResolvedValueOnce(user);

    const response = getUserAccountsService.execute(user);

    await expect(response).resolves.not.toThrow();
  });
});
