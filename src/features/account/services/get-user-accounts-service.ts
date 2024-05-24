import type { Service } from '@/shared/protocols/service.js';
import type { UserModel } from '@/features/user/models/user-model.js';
import type { UserRepository } from '@/features/user/repositories/user-repository/user-repository.js';
import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository.js';
import { UserNotFound } from '@/shared/errors/user-not-found-error.js';

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
