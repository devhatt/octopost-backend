import { mock } from 'vitest-mock-extended';

import type { UserRepository } from '@/features/user/repositories/user-repository';
import { accountRepositoryMock } from '@/shared/test-helpers/mocks/repositories/account-repository.mock';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock';

import type { AccountRepository } from '../repositories/account-repository/account-repository';
import { GetUserAccountsService } from './get-user-accounts-service';

describe('GetUserAccountsService', () => {
  let getUserAccountsService: GetUserAccountsService;
  const userRepository = mock<UserRepository>(userRepositoryMock);
  const accountRepository = mock<AccountRepository>(accountRepositoryMock);

  beforeEach(() => {
    getUserAccountsService = new GetUserAccountsService(
      userRepository,
      accountRepository
    );
  });

  it('success', async () => {
    const user = UserMock.create();

    userRepository.findById.mockResolvedValueOnce(user);

    accountRepository.findAccountsByUserId.mockResolvedValueOnce([]);

    const { accounts } = await getUserAccountsService.execute({
      id: user.id,
    });

    expect(accounts).toEqual([]);
  });
});
