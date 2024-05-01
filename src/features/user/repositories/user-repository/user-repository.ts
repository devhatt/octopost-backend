import type { Prisma } from '@prisma/client';
import { database } from '@/shared/infra/database/database.js';

type CreateUserParams = Prisma.Args<typeof database.user, 'create'>['data'];

export class UserRepository {
  async create({ email, name, password, username }: CreateUserParams) {
    return database.user.create({
      data: {
        email,
        name,
        password,
        username,
      },
    });
  }

  async findById(id: string) {
    const user = await database.user.findUnique({
      select: expect.anything(),
      where: {
        id,
      },
    });

    return user;
  }
}
