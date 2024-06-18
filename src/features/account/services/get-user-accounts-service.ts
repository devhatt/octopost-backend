import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import type { UserModel } from '@/features/user/models/user-model';
import type { UserRepository } from '@/features/user/repositories/user-repository/user-repository';
import { UserNotFound } from '@/shared/errors/user-not-found-error';
import type { Service } from '@/shared/protocols/service';

export class GetUserAccountsService implements Service<UserModel> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute({ id }: UserModel) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFound();
    }
    return await this.accountRepository.getAccounts(id);
  }
}
