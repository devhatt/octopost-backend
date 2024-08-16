import type { Express } from 'express';

import { bodyParser } from '@/middlewares/body-parser/body-parser';
import { cors } from '@/middlewares/cors/cors';
import { httpLogger } from '@/middlewares/logger/http-logger';

export function setupMiddlewares(app: Express): void {
  app.use(bodyParser);
  app.use(cors);
  app.use(httpLogger);
}
