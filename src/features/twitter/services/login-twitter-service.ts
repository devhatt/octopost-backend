import jwt from 'jsonwebtoken';

import type { TokenPayload } from '@/shared/infra/jwt/jwt';

import { generateAuthURL } from '../helpers/generate-auth-url';

type Input = {
  authorization: string | undefined;
};

export class LoginTwitterService {
  execute({ authorization }: Input) {
    if (!authorization) {
      throw new Error('Unauthorized');
    }

    const [, token] = authorization.split(' ');

    const payload = jwt.verify(token, 'secret_key') as TokenPayload;

    const url = generateAuthURL({ id: payload.userId });

    return url;
  }
}
