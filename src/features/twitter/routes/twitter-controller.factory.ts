import { Logger } from '@/shared/infra/logger/logger';

import { TwitterController } from '../controllers/twitter-controller';
import { AuthorizeTwitterService } from '../services/authorize-twitter-service';

export function twitterControllerFactory() {
  const authorizeTwitterService = new AuthorizeTwitterService(
    new Logger({ service: 'authorizeTwitterService' })
  );

  const twitterController = new TwitterController(authorizeTwitterService);

  return {
    twitterController,
  };
}
