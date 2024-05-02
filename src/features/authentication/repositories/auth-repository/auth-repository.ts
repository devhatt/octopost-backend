import { database } from '@/shared/infra/database/database.js';

export class AuthRepository {
  async findPasswordByUsername(username: string) {
    const user = await database.user.findUnique({
      where: {
        username,
      },
    });

    return {
      password: user?.password,
    };
  }

  async findUserByUsername(username: string) {
    const user = await database.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }
}
