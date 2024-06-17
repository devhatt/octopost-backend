import request from 'supertest';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { bodyParser } from './body-parser';

const makeSut = () => {
  const app = express();

  return { app };
};

describe('[Middlewares] ErrorHandler', () => {
  it('should parse json http post', async () => {
    const { app } = makeSut();

    app.post(
      '/json-parser',
      bodyParser,
      (req: Request, res: Response, _: NextFunction): void => {
        res.json({ ...req.body });
      }
    );

    const response = await request(app).post('/json-parser').send({
      body: 'json-parser',
    });

    expect(response.status).toBe(200);

    expect(response.body).toStrictEqual({
      body: 'json-parser',
    });
  });
});
