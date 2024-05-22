import type { UserModel } from '../models/user-model.js';
import type { UserRepository } from '../repositories/user-repository/user-repository.js';
import type { Service } from '@/shared/protocols/service.js';
import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository.js';

export class UserService implements Service<UserModel> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute({ id }: UserModel) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.accountRepository.getAccounts(id);
  }
}
