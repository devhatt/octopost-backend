import type { Prisma } from '@prisma/client';
import { database } from '@/shared/infra/database/database.js';

type CreateUserParams = Prisma.Args<typeof database.users, 'create'>['data'];

export class UserRepository {
  async create({ email, name, password }: CreateUserParams) {
    const user = await database.users.create({
      data: {
        email,
        name,
        password,
      },
    });

    return user;
  }
}
