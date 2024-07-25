import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { HttpError } from '@/shared/errors/http-error.js';
import { HttpStatusCode } from '@/shared/protocols/http-client.js';

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    return res.status(409).send({
      issues: err.format(),
      message: 'Validation error',
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.code).json(err);
  }

  return res.status(HttpStatusCode.serverError).json({ message: err.message });
};
