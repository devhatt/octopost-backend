import { mock } from 'vitest-mock-extended';

import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import { GetUserAccountsService } from '@/features/account/services/get-user-accounts-service';
import type { UserRepository } from '@/features/user/repositories/user-repository';
import { accountRepositoryMock } from '@/shared/test-helpers/mocks/repositories/account-repository.mock';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock';

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
