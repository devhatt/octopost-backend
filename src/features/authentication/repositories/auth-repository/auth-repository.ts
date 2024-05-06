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
      where: {
        password,
        username,
      },
    });

    const userWithoutPassword = {
      email: user?.email,
      id: user?.id,
      name: user?.name,
      username: user?.username,
    };

    return userWithoutPassword;
  }

  async findUserByUsername(username: string) {
    const user = await database.user.findUnique({
      where: {
        username,
      },
    });

    const userWithoutPassword = {
      email: user?.email,
      id: user?.id,
      name: user?.name,
      username: user?.username,
    };

    return userWithoutPassword;
  }
}
