import type { Service } from '@/shared/protocols/service.js';
import type { AccountRepository } from '../repositories/account-repository/account-repository.js';
import type { AccountModel } from '../models/account-model.js';
import { BadRequestError } from '@/shared/errors/bad-request-error.js';

export class DeleteUserAccountsService implements Service<AccountModel> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ socialMediaId }: AccountModel) {
    if (!socialMediaId) throw new BadRequestError('undefined social media id');
    await this.accountRepository.deleteAccountsBySocialMediaId(socialMediaId);
  }
}
