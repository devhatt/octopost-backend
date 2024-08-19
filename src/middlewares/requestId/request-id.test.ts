import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import httpContext from 'express-http-context';
import request from 'supertest';

import { requestId } from './request-id';

const makeSut = () => {
  const app = express();

  return { app };
};

describe('[Middlewares] RequestId', () => {
  it('should generate request id', async () => {
    const { app } = makeSut();

    app.use(httpContext.middleware);
    app.use(requestId);

    let value = '';

    app.get('/test', (_: Request, res: Response, __: NextFunction): void => {
      value = httpContext.get('requestId');
      res.send('Test response');
    });

    const response = await request(app).get('/test');

    const validUUIDV4Regex = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );

    expect(response.status).toBe(200);
    expect(validUUIDV4Regex.test(value)).toBeTruthy();
  });
});
