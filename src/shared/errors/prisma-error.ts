import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { NextFunction, Response } from 'express';

import { HttpStatusCode } from '../protocols/http-client';

export function prismaErrorHandler(
  error: PrismaClientKnownRequestError,
  res: Response,
  _: NextFunction
) {
  switch (error.code) {
    case 'P2002': {
      res.status(HttpStatusCode.badRequest).send({
        message: 'There is already a user with this email or username',
      });
    }
  }
}
