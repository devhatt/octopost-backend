import type { UserRepository } from '@/features/user/repositories/user-repository';
import { UserNotFound } from '@/shared/errors/user-not-found-error';
import type { JWTHelper, TokenPayload } from '@/shared/infra/jwt/jwt';
import type { Service } from '@/shared/protocols/service';

import type { AuthTokenValidationModel } from '../models/auth-token-validation-models';

type Input = {
  token: string;
};

type Output = {
  email: string;
  id: string;
  name: null | string;
  username: string;
};

export class AuthTokenValidationService implements Service<Input, Output> {
  constructor(
    private readonly userReposiotry: UserRepository,
    private jwt: JWTHelper
  ) {}

  async execute({ token }: AuthTokenValidationModel) {
    const payload = this.jwt.parseToken(token) as TokenPayload;

    const isUserIdExist = await this.userReposiotry.findById(payload.userId);

    if (!isUserIdExist) {
      throw new UserNotFound();
    }

    return isUserIdExist;
  }
}
