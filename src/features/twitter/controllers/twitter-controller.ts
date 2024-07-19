import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

import { generateAuthURL } from '../helpers/generate-auth-url';
import type { AuthorizeTwitterService } from '../services/authorize-twitter-service';

export class TwitterController implements Controller {
  callback: AsyncRequestHandler = async (req, res) => {
    const query = req.query;

    const code = await this.authorizeTwitter.execute({
      code: String(query.code),
    });

    return res.json(code);
  };

  create: AsyncRequestHandler = (_, res) => res.send();

  login: AsyncRequestHandler = (_, res) => {
    const url = generateAuthURL();
    return res.redirect(url);
  };

  constructor(private readonly authorizeTwitter: AuthorizeTwitterService) {}
}
