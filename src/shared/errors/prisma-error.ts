import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { ConflictError } from '@/shared/errors/conflict-error';

export function prismaErrorHandler(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': {
        throw new ConflictError(
          'There is already a user with this email or username'
        );
      }
    }
  }
}
