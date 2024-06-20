import type { AuthRepository } from '@/features/authentication/repositories/auth-repository/auth-repository.js';
import { UserNotFound } from '@/shared/errors/user-not-found-error.js';
import type { JWTHelper, TokenPayload } from '@/shared/infra/jwt/jwt.js';
import type { Service } from '@/shared/protocols/service.js';
import type { AuthTokenValidationModel } from '../models/auth-token-validation-models.js';

export class AuthTokenValidationService
  implements Service<AuthTokenValidationModel>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private jwt: JWTHelper
  ) {}

  async execute({ token }: AuthTokenValidationModel) {
    const payload = this.jwt.parseToken(token) as TokenPayload;

    const isUserIdExist = await this.authRepository.findUserById(
      payload.userId
    );

    if (!isUserIdExist) {
      throw new UserNotFound();
    }

    return isUserIdExist;
  }
}
