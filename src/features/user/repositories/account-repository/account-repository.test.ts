import { AccountRepository } from './account-repository.js';
import { AccountMock } from '@/shared/test-helpers/mocks/account.mock.js';
import { prisma } from 'mocks/prisma.js';

const makeSut = () => {
  const repository = new AccountRepository();

  return { repository };
};

describe('[Repositories] AccountRepository', () => {
  it('should call service for create account', async () => {
    const { repository } = makeSut();

    const account = AccountMock.create();

    await repository.create(account);

    const { userId } = account;

    expect(prisma.account.create).toHaveBeenCalledWith({
      data: userId,
    });
  });
});
