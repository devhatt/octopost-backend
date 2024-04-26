import type { ErrorRequestHandler } from 'express';
import { HttpError } from '@/shared/errors/http-error.js';
import { HttpStatusCode } from '@/shared/protocols/http-client.js';

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    return res.status(err.code).json(err);
  }

  return res.status(HttpStatusCode.serverError).json({ message: err.message });
};
