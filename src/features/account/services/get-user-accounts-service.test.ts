import { accountRepositoryMock } from '@/shared/test-helpers/mocks/repositories/account-repository.mock';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock';

import { GetUserAccountsService } from './get-user-accounts-service';

const makeSut = () => {
  const getUserAccountsService = new GetUserAccountsService(
    userRepositoryMock,
    accountRepositoryMock
  );

  return {
    accountRepository: accountRepositoryMock,
    getUserAccountsService,
    userRepository: userRepositoryMock,
  };
};

describe('GetUserAccountsService', () => {
  it('calls accountRepository.getAccounts with correct user id', async () => {
    const { accountRepository, getUserAccountsService, userRepository } =
      makeSut();
    const user = UserMock.create();

    userRepository.findById.mockResolvedValueOnce(user);

    await getUserAccountsService.execute(user);

    expect(accountRepository.getAccounts).toHaveBeenCalledWith(user.id);
  });

  it('throws an error if userRepository.findById returns null', async () => {
    const { getUserAccountsService, userRepository } = makeSut();
    const user = UserMock.create();
    userRepository.findById.mockResolvedValueOnce(null);

    const response = getUserAccountsService.execute(user);

    await expect(response).rejects.toThrowError('User not found');
    expect(userRepository.findById).toHaveBeenCalledWith(user.id);
  });

  it('throws an error if userRepository.findById does not return a user.', async () => {
    const { getUserAccountsService, userRepository } = makeSut();
    const user = UserMock.create();
    userRepository.findById.mockResolvedValueOnce(user);

    const response = getUserAccountsService.execute(user);

    await expect(response).resolves.not.toThrow();
  });
});
