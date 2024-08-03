import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error';
import type { CryptoAdapter } from '@/shared/infra/crypto/crypto-adapter';
import type { JWTHelper } from '@/shared/infra/jwt/jwt';
import type { Service } from '@/shared/protocols/service';

import type { AuthLoginModel } from '../models/auth-login-models';
import type { AuthRepository } from '../repositories/auth-repository/auth-repository';

type Input = {
  password: string;
  username: string;
};

type Output = {
  token: string;
};

export class AuthLoginService implements Service<Input, Output> {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly crypto: CryptoAdapter,
    private readonly jwt: JWTHelper
  ) {}

  async execute({ password, username }: AuthLoginModel) {
    const user = await this.authRepository.findUserByUsername(username);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValidPassword = await this.crypto.compare(password, user.password);

    if (!isValidPassword) {
      throw new InvalidCredentialsError();
    }

    const token = this.jwt.createToken({
      name: user.name || '',
      userId: user.id,
      username: user.username,
    });

    return {
      token,
    };
  }
}
