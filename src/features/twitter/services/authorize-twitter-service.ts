import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import type { Logger } from '@/shared/infra/logger/logger';
import type { Service } from '@/shared/protocols/service';

import type { TwitterUser } from '../models/twitter-models';
import type { TwitterService } from './twitter-service';

type Input = {
  code: string;
  state: string;
};

export class AuthorizeTwitterService implements Service<Input, TwitterUser> {
  constructor(
    private readonly logger: Logger,
    private readonly twitterService: TwitterService,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute({ code, state }: Input) {
    this.logger.info('Inicialize authorize twitter service');
    const userId = state;

    const twitterOAuthToken =
      await this.twitterService.getTwitterOAuthToken(code);

    if (!twitterOAuthToken) {
      throw new Error('Erro');
    }

    const twitterUser = await this.twitterService.getTwitterUser(
      twitterOAuthToken.access_token
    );

    //TODO: improve
    const accounts = await this.accountRepository.getAccounts(userId);

    const accountExists = accounts.filter(
      (account) => account.socialMediaId === 1
    );

    if (!accountExists.length) {
      await this.accountRepository.create({
        avatarUrl: '',
        socialMediaId: 1,
        socialUserId: twitterUser.id,
        userId: userId,
      });
    }

    return twitterUser;
  }
}
