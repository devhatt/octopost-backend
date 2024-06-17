import { BadRequestError } from '@/shared/errors/bad-request-error';
import type { Service } from '@/shared/protocols/service';

import type { AccountModel } from '../models/account-model';
import type { AccountRepository } from '../repositories/account-repository/account-repository';

export class DeleteUserAccountsService implements Service<AccountModel> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ socialMediaId }: AccountModel) {
    if (!socialMediaId) throw new BadRequestError('undefined social media id');
    await this.accountRepository.deleteAccountsBySocialMediaId(socialMediaId);
  }
}
