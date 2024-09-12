import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error';
import { UnauthorizedHeaderError } from '@/shared/errors/unauthorized-header-error';
import { JWTHelper } from '@/shared/infra/jwt/jwt';
import type { Service } from '@/shared/protocols/service';

import { generateAuthURL } from '../helpers/generate-auth-url';

type AuthConfig = {
  secretKey: string;
};

type Input = {
  authorization?: string;
};

export class LoginTwitterService implements Service<Input, string> {
  private authConfig: AuthConfig;

  constructor(authConfig: AuthConfig) {
    this.authConfig = authConfig;
  }

  execute({ authorization }: Input) {
    if (!authorization) {
      throw new UnauthorizedHeaderError();
    }

    const jwtHelper = new JWTHelper(this.authConfig.secretKey);
    const [, token] = authorization.split(' ');
    let payload;

    try {
      payload = jwtHelper.parseToken(token);
    } catch {
      throw new InvalidCredentialsError();
    }

    const url = generateAuthURL({ id: payload.userId });

    return url;
  }
}
