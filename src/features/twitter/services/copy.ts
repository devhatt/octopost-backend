import { auth, Client } from 'twitter-api-sdk';

import type { Logger } from '@/shared/infra/logger/logger';
import type { Service } from '@/shared/protocols/service';

export class AuthorizeTwitterService implements Service<any, string> {
  private authOptions: auth.OAuth2User;
  private twtClient: Client;

  constructor(private readonly logger: Logger) {
    this.authOptions = new auth.OAuth2User({
      callback: 'http://www.localhost:3000/api/twitter/callback',
      client_id: process.env.TWITTER_CLIENT_ID || '',
      scopes: ['tweet.write', 'tweet.read', 'users.read'],
    });

    this.twtClient = new Client(this.authOptions);
  }

  execute(_: any) {
    this.logger.info('Inicialize authorize twitter service');

    const url = this.authOptions.generateAuthURL({
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
      state: 'state',
    });

    return url;
  }
}
