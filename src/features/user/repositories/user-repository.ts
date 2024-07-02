import type { Prisma } from '@prisma/client';

import { prismaErrorHandler } from '@/shared/errors/prisma-error';
import { database } from '@/shared/infra/database/database';

type CreateUserParams = Prisma.Args<typeof database.user, 'create'>['data'];

export class UserRepository {
  async create({ email, name, password, username }: CreateUserParams) {
    try {
      return database.user.create({
        data: {
          email,
          name,
          password,
          username,
        },
      });
    } catch (error) {
      prismaErrorHandler(error);
    }
  }

  async findById(id: string) {
    const user = await database.user.findUnique({
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

    return user;
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
