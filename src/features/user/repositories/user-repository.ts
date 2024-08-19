import type { Prisma } from '@prisma/client';

import { database } from '@/shared/infra/database/database';

type CreateUserParams = Prisma.Args<typeof database.user, 'create'>['data'];

export class UserRepository {
  create({ email, name, password, username }: CreateUserParams) {
    return database.user.create({
      data: {
        email,
        name,
        password,
        username,
      },
    });
  }

  findByEmail(email: string) {
    return database.user.findUnique({
      select: {
        email: true,
        id: true,
        isActive: true,
        name: true,
        username: true,
      },
      where: {
        email,
      },
    });
  }

  findById(id: string) {
    return database.user.findUnique({
      select: {
        email: true,
        id: true,
        isActive: true,
        name: true,
        username: true,
      },
      where: {
        id,
      },
    });
  }

  async updateIsActiveStatus(userId: string): Promise<void> {
    await database.user.update({
      data: {
        isActive: true,
      },
      where: {
        id: userId,
      },
    });
  }
}
