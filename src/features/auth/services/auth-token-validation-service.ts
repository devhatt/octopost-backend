import type { UserRepository } from '@/features/user/repositories/user-repository';
import { EmailAlreadyActiveError } from '@/shared/errors/email-already-active-error';
import { UserNotFound } from '@/shared/errors/user-not-found-error';
import type { JWTHelper, TokenPayload } from '@/shared/infra/jwt/jwt';
import type { Service } from '@/shared/protocols/service';

type Input = {
  token: string;
};

export class AuthTokenValidationService implements Service<Input, void> {
  constructor(
    private readonly userReposiotry: UserRepository,
    private jwt: JWTHelper
  ) {}

  async execute({ token }: Input) {
    const payload = this.jwt.parseToken(token);

    const user = await this.userReposiotry.findById(payload.userId);

    if (!user) {
      throw new UserNotFound();
    }

    if (user.isActive) {
      throw new EmailAlreadyActiveError('E-mail already active');
    }

    await this.userReposiotry.updateIsActiveStatus(user.id);
  }
}
