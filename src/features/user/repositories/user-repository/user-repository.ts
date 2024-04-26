import type { Prisma } from '@prisma/client';
import { database } from '@/shared/infra/database/database.js';

type CreateUserParams = Prisma.Args<typeof database.user, 'create'>['data'];

export class UserRepository {
  async create({ email, password }: CreateUserParams) {
    const user = await database.user.create({
      data: {
        email,
        password,
      },
    });

    return user;
  }
}
