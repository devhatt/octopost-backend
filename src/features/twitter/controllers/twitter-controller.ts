import jwt from 'jsonwebtoken';

import type { TokenPayload } from '@/shared/infra/jwt/jwt';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { HttpStatusCode } from '@/shared/protocols/http-client';

import { generateAuthURL } from '../helpers/generate-auth-url';
import type { AuthorizeTwitterService } from '../services/authorize-twitter-service';
import type { PostTwitterService } from '../services/post-twitter-service';

export class TwitterController implements Controller {
  callback: AsyncRequestHandler = async (req, res) => {
    const query = req.query;

    await this.authorizeTwitter.execute({
      code: String(query.code),
      state: String(query.state),
    });

    return res.send();
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

  tweet: AsyncRequestHandler = (req, res) => {
    const authorization = req.headers.authorization; // token bearer user

    const { file, text } = req.body; // talvez tenha a localização também

    const tweet = this.postTwitterService.execute({ file, text });

    return res.status(HttpStatusCode.ok).json();
  };

  constructor(
    private readonly authorizeTwitter: AuthorizeTwitterService,
    private readonly postTwitterService: PostTwitterService
  ) {}
}
