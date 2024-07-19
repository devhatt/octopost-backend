import type { Logger } from '@/shared/infra/logger/logger';
import type { Service } from '@/shared/protocols/service';

import type { TwitterService, TwitterUser } from './twitter-service';

type Input = {
  code: string;
};

export class AuthorizeTwitterService implements Service<Input, TwitterUser> {
  constructor(
    private readonly logger: Logger,
    private readonly twitterService: TwitterService
    // private readonly accountRepository: AccountRepository
  ) {}

  async execute({ code }: Input) {
    this.logger.info('Inicialize authorize twitter service');

    const twitterOAuthToken =
      await this.twitterService.getTwitterOAuthToken(code);

    if (!twitterOAuthToken) {
      throw new Error('Erro');
    }

    const twitterUser = await this.twitterService.getTwitterUser(
      twitterOAuthToken.access_token
    );

    console.log({ twitterUser });

    return twitterUser;
  }
}
