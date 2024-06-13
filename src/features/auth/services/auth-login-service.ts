import type { Service } from '@/shared/protocols/service.js';
import type { CryptoAdapter } from '@/shared/infra/crypto/crypto-adapter.js';
import type { AuthRepository } from '@/features/authentication/repositories/auth-repository/auth-repository.js';
import type { AuthLoginModel } from '../models/auth-login-models.js';
import type { JWTHelper } from '@/shared/infra/jwt/jwt.js';

export class AuthLoginService implements Service<AuthLoginModel> {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly crypto: CryptoAdapter,
    private jwt: JWTHelper
  ) {}

  async execute({ password, username }: AuthLoginModel) {
    const hashedPassword = await this.crypto.encrypt(password);

    const user = await this.authRepository.findUserByCredentials({
      password: hashedPassword,
      username,
    });

    if (!user) {
      throw new Error('Invalid Credentials!');
    }

    const token = this.jwt.createToken({ userId: user.id });

    return token;
  }
}
