import { DeleteUserAccountsService } from '@/features/account/services/delete-user-accounts-service';
import { AccountMock } from '@/shared/test-helpers/mocks/account.mock';
import { accountRepositoryMock } from '@/shared/test-helpers/mocks/repositories/account-repository.mock';

const makeSut = () => {
  const deleteUserAccountsService = new DeleteUserAccountsService(
    accountRepositoryMock
  );

  return {
    accountRepository: accountRepositoryMock,
    deleteUserAccountsService,
  };
};

describe('DeleteUserAccountsService', () => {
  it('deletes accounts by social media id', async () => {
    const { accountRepository, deleteUserAccountsService } = makeSut();
    const account = AccountMock.create();

    await deleteUserAccountsService.execute(account);

    expect(
      accountRepository.deleteAccountsBySocialMediaId
    ).toHaveBeenCalledWith(account.socialMediaId);
  });
});
