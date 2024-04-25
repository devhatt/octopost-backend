import request from 'supertest';
import { errorHandler } from './error-handler';
import express from 'express';
import type { NextFunction, Response } from 'express';
import { HttpError } from '@/shared/errors/HttpError';

const makeSut = () => {
  const app = express();

  return { app };
};

describe('[Middlewares] ErrorHandler', () => {
  it('should handle http errors and send toJSON of error', async () => {
    const { app } = makeSut();

    app.get(
      '/error-handler',
      (_: any, __: any, next: NextFunction): void => {
        next(new HttpError(400, 'error message'));
      },
      errorHandler
    );

    const response = await request(app).get('/error-handler');

    expect(response.status).toBe(400);

    expect(response.body).toStrictEqual({
      code: 400,
      message: 'error message',
    });
  });

  it('should send errors and return message', async () => {
    const { app } = makeSut();

    app.get(
      '/error-handler',
      (_: any, __: any, next: NextFunction): void => {
        next(new Error('native error'));
      },
      errorHandler
    );

    const response = await request(app).get('/error-handler');

    expect(response.status).toBe(500);

    expect(response.body).toStrictEqual({
      message: 'native error',
    });
  });

  it('should not send error if headers already sent', async () => {
    const { app } = makeSut();

    app.use(
      '/error-handler',
      (_: any, res: Response, next: NextFunction): void => {
        res.status(500).send({ message: 'error message' });
        next(new HttpError(400, 'error message'));
      },
      errorHandler
    );

    const response = await request(app).post('/error-handler');

    expect(response.status).toBe(500);

    expect(response.body).toStrictEqual({
      message: 'error message',
    });
  });
});
