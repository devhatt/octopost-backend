import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import type { Service } from '@/shared/protocols/service';

type Input = {
  socialMediaId: number;
};

export class DeleteUserAccountsService implements Service<Input, void> {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ socialMediaId }: Input) {
    await this.accountRepository.deleteAccountsBySocialMediaId(socialMediaId);
  }
}
