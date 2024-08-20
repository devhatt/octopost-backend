import type { FindUserByCredentialsParams } from '@/features/auth/models/auth-login-models';
import { database } from '@/shared/infra/database/database';

export class AuthRepository {
  findUserByCredentials({ password, username }: FindUserByCredentialsParams) {
    return database.user.findFirst({
      select: {
        email: true,
        id: true,
        name: true,
        username: true,
      },
      where: {
        password,
        username,
      },
    });
  }

  findUserByUsername(username: string) {
    return database.user.findUnique({
      select: {
        email: true,
        id: true,
        name: true,
        password: true,
        username: true,
      },
      where: {
        username,
      },
    });
  }
}
