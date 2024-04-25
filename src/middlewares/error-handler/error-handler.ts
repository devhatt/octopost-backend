import { HttpError } from '@/shared/errors/http-error.js';
import { HttpStatusCode } from '@/shared/protocols/http-client.js';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    return res.status(err.code).json(err);
  }

  return res.status(HttpStatusCode.serverError).json({ message: err.message });
};
