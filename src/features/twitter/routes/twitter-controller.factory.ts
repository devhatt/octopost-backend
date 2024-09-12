/* istanbul ignore file -- @preserve */
import { AccountRepository } from '@/features/account/repositories/account-repository/account-repository';
import { TokenRepository } from '@/features/account/repositories/token-repository/token-repository';
import { AxiosHandler } from '@/shared/infra/http/axios-http';
import { Logger } from '@/shared/infra/logger/logger';

import { TwitterController } from '../controllers/twitter-controller';
import { AuthorizeTwitterService } from '../services/authorize-twitter-service';
import { PostTwitterService } from '../services/post-twitter-service';
import { TwitterService } from '../services/twitter-service';

export function twitterControllerFactory() {
  const axiosAdapter = new AxiosHandler({
    baseURL: 'https://api.twitter.com',
  });

  const twitterService = new TwitterService(
    new Logger({ service: 'twitterService' }),
    axiosAdapter
  );

  const tokenRepository = new TokenRepository();
  const accountRepository = new AccountRepository();

  const authorizeTwitterService = new AuthorizeTwitterService(
    new Logger({ service: 'authorizeTwitterService' }),
    twitterService,
    accountRepository,
    tokenRepository
  );

  const postTwitterService = new PostTwitterService(
    new Logger({ service: 'postTwitterService' }),
    axiosAdapter
  );

  const twitterController = new TwitterController(
    authorizeTwitterService,
    postTwitterService
  );

  return {
    twitterController,
  };
}
