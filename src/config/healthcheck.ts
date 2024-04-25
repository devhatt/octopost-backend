import { HttpStatusCode } from '@/shared/protocols/http-client.js';
import { Express } from 'express';

export default (app: Express): void => {
  app.get('/healthcheck', (req, res) => {
    res.status(HttpStatusCode.ok).json({ status: 'Running :)' });
  });
};
