import jwt from 'jsonwebtoken';

import type { TokenPayload } from '@/shared/infra/jwt/jwt';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

import { generateAuthURL } from '../helpers/generate-auth-url';
import type { AuthorizeTwitterService } from '../services/authorize-twitter-service';

export class TwitterController implements Controller {
  callback: AsyncRequestHandler = async (req, res) => {
    const query = req.query;

    const code = await this.authorizeTwitter.execute({
      code: String(query.code),
      state: String(query.state),
    });

    return res.json(code);
  };

  login: AsyncRequestHandler = (req, res) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const [, token] = authorization.split(' ');

    const payload = jwt.verify(token, 'secret_key') as TokenPayload;

    const url = generateAuthURL({ id: payload.userId });

    return res.json(url);
  };

  constructor(private readonly authorizeTwitter: AuthorizeTwitterService) {}
}
