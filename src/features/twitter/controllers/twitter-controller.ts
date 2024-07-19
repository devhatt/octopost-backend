import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

import { generateAuthURL } from '../helpers/generate-auth-url';
import type { AuthorizeTwitterService } from '../services/authorize-twitter-service';

export class TwitterController implements Controller {
  callback: AsyncRequestHandler = async (req, res) => {
    const query = req.query;

    console.log({ query });
    await Promise.resolve();

    return res.send();
  };

  login: AsyncRequestHandler = (_, res) => {
    const urlBuilded = generateAuthURL();
    const urlClient = this.authorizeTwitter.execute({});
    return res.redirect(urlBuilded);
  };

  constructor(private readonly authorizeTwitter: AuthorizeTwitterService) {}
}
