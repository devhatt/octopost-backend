import type { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import type { TokenRepository } from '@/features/account/repositories/token-repository/token-repository';
import type { Logger } from '@/shared/infra/logger/logger';
import type { Service } from '@/shared/protocols/service';

import type { TwitterService } from './twitter-service';

type Input = {
  code: string;
  state: string;
};

export class AuthorizeTwitterService implements Service<Input, void> {
  constructor(
    private readonly logger: Logger,
    private readonly twitterService: TwitterService,
    private readonly accountRepository: AccountRepository,
    private readonly tokenRepository: TokenRepository
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

    let accountExist = await this.accountRepository.getAccountBySocialMedia({
      socialMediaUserId: twitterUser.id,
      userId,
    });

    if (!accountExist) {
      accountExist = await this.accountRepository.create({
        avatarUrl: '',
        socialMediaId: 1,
        socialMediaUserId: twitterUser.id,
        userId: userId,
      });
    }

    await this.tokenRepository.upsert({
      accessToken: twitterOAuthToken.access_token,
      accountId: accountExist.id,
      authToken: twitterOAuthToken.token_type,
      expiresIn: twitterOAuthToken.expires_in,
    });
  }
}
