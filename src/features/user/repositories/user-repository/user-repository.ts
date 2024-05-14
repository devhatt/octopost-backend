import type { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/react-native.js';
import { database } from '@/shared/infra/database/database.js';
import { ConflictError } from '@/shared/errors/conflict-error.js';

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
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new ConflictError(
          'There is already a user with this email or username'
        );
      throw error;
    }
  }

  async findById(id: string) {
    const user = await database.user.findUnique({
      select: {
        email: true,
        id: true,
        name: true,
        username: true,
      },
      where: {
        id,
      },
    });

    return user;
  }
}
