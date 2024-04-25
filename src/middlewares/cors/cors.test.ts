import request from 'supertest';
import express from 'express';
import type { NextFunction, Response, Request } from 'express';
import { cors } from './cors';

const makeSut = () => {
  const app = express();

  return { app };
};

describe('[Middlewares] Cors', () => {
  it('should set the necessary headers for CORS', async () => {
    const { app } = makeSut();

    app.use(cors);

    app.get('/test', (req: Request, res: Response, _: NextFunction): void => {
      res.send('Test response');
    });

    const response = await request(app).get('/test');

    expect(response.status).toBe(200);

    expect(response.header['access-control-allow-origin']).toBe('*');
    expect(response.header['access-control-allow-headers']).toBe('*');
    expect(response.header['access-control-allow-methods']).toBe('*');
  });
});
