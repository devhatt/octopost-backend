import { AccountRepository } from './account-repository';
import { AccountMock } from '@/shared/test-helpers/mocks/account.mock';
import { prisma } from 'mocks/prisma';

const makeSut = () => {
  const repository = new AccountRepository();

  return { repository };
};

describe('[Repositories] AccountRepository', () => {
  it('should call service for create account', async () => {
    const { repository } = makeSut();

    const account = AccountMock.create();

    await repository.create(account);

    const { id, ...accountWithoutId } = account;

    expect(prisma.account.create).toHaveBeenCalledWith({
      data: accountWithoutId,
    });
  });
});
