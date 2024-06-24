import { database } from '@/shared/infra/database/database';

// TODO: Move this type to a folder
type FindUserByCredentialsParams = {
  password: string;
  username: string;
};

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
        username: true,
      },
      where: {
        username,
      },
    });
  }
}
