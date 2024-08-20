import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { HttpError } from '@/shared/errors/http-error.js';
import { prismaErrorHandler } from '@/shared/errors/prisma-error';
import { HttpStatusCode } from '@/shared/protocols/http-client.js';

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    return res.status(409).send({
      error: err.formErrors.fieldErrors,
      issues: err.name,
      message: 'Validation error',
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.code).json(err);
  }

  if (err instanceof PrismaClientKnownRequestError) {
    return prismaErrorHandler(err, res, next);
  }

  return res.status(HttpStatusCode.serverError).json({ message: err.message });
};
