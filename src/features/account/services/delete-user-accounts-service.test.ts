import { describe, expect, it, vi } from 'vitest';
import { AccountMock } from '@/shared/test-helpers/mocks/account.mock.js';
import { DeleteUserAccountsService } from './delete-user-accounts-service.js';
import { BadRequestError } from '@/shared/errors/bad-request-error.js';

const makeSut = () => {
  const accountRepository = {
    deleteAccountsBySocialMediaId: vi.fn(),
    getAccounts: vi.fn(),
  };
  const deleteUserAccountsService = new DeleteUserAccountsService(
    accountRepository
  );

  return { accountRepository, deleteUserAccountsService };
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

  it('throws BadRequestError if socialMediaId is not provided', async () => {
    const { deleteUserAccountsService } = makeSut();
    const account = AccountMock.create({ socialMediaId: undefined });

    await expect(deleteUserAccountsService.execute(account)).rejects.toThrow(
      BadRequestError
    );
  });
});
