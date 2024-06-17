import type { Express } from 'express';

import { HttpStatusCode } from '@/shared/protocols/http-client';

export const setupHealthCheck = (app: Express): void => {
  app.get('/healthcheck', (_, res) => {
    res.status(HttpStatusCode.ok).json({ status: 'Running :)' });
  });
};
