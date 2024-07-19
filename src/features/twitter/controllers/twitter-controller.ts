import 'dotenv/config';

import { log } from 'console';

import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

export class TwitterController implements Controller {
  authorize: AsyncRequestHandler = async (req, res, next) => {
    const baseUrl = 'https://twitter.com/i/oauth2/authorize';
    const clientId = process.env.TWITTER_CLIENT_ID || '';

    const redirectUri = 'http://localhost:3000/api/twitter/callback';
    const scope = ['tweet.write', 'users.read', 'twitter.read'];

    const params = new URLSearchParams({
      client_id: clientId,
      code_challenge: 'y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8',
      code_challenge_method: 'S256',
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope.join(' '),
      state: 'state',
    });

    const urlBuilded = `${baseUrl}?${params.toString()}`;

    log({ urlBuilded });
    return res.redirect(urlBuilded);
  };

  callback: AsyncRequestHandler = async (req, res, next) => {
    console.log('redirect');
  };

  constructor() {}
}
