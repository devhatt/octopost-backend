import type { AccountModel } from '@/features/account/models/account-model';
import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import type { UserRepository } from '@/features/user/repositories/user-repository/user-repository';
import { UserNotFound } from '@/shared/errors/user-not-found-error';
import type { Service } from '@/shared/protocols/service';

type Input = {
  id: string;
};

type Output = {
  accounts: AccountModel[];
};

export class GetUserAccountsService implements Service<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute({ id }: Input): Promise<Output> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    const accounts = await this.accountRepository.findAccountsByUserId(user.id);

    return {
      accounts: accounts,
    };
  }
}
