import { database } from '@/shared/infra/database/database.js';

type FindUserByCredentialsParams = {
  password: string;
  username: string;
};
export class AuthRepository {
  async findUserByCredentials({
    password,
    username,
  }: FindUserByCredentialsParams) {
    const user = await database.user.findFirst({
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

    return user;
  }

  async findUserByUsername(username: string) {
    const user = await database.user.findUnique({
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

    return user;
  }
}
