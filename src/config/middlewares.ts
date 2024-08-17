import type { Express } from 'express';
import httpContext from 'express-http-context';

import { authFilterMiddleware } from '@/middlewares/auth/auth-filter-middleware';
import { bodyParser } from '@/middlewares/body-parser/body-parser';
import { cors } from '@/middlewares/cors/cors';
import { httpLogger } from '@/middlewares/logger/http-logger';
import { requestId } from '@/middlewares/requestId/request-id';

export function setupMiddlewares(app: Express): void {
  app.use(authFilterMiddleware);
  app.use(bodyParser);
  app.use(cors);
  app.use(httpLogger);
  app.use(httpContext.middleware);
  app.use(requestId);
}
