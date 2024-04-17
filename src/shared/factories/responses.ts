import type { HttpError } from '../errors/HttpError';
import type { HttpResponse } from '../protocols/http';

export const responseErrorFactory = (error: HttpError): HttpResponse => ({
  statusCode: 500,
  body: { statusCode: 500, message: error.message },
});

export const responseOkFactory = (body: unknown): HttpResponse => ({
  statusCode: 200,
  body,
});
