import { AccountRepository } from './account-repository.js';
import { AccountMock } from '@/shared/test-helpers/mocks/account.mock.js';

const makeSut = () => {
  const repository = new AccountRepository();

  return { repository };
};

describe('[Repositories] AccountRepository', () => {
  it('should call service for create account', async () => {
    const { repository } = makeSut();

    const repositorySpy = vi.spyOn(repository, 'create');

    const account = AccountMock.create();

    await repository.create(account);

    expect(repositorySpy).toHaveBeenCalledWith({
      repository,
    });
  });
});
