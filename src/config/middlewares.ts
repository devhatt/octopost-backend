import type { Express } from 'express';
import { cors } from '@/middlewares/cors/cors.js';
import { bodyParser } from '@/middlewares/body-parser/body-parser.js';
import { logger } from '@/middlewares/logger/logger.js';

export default function setupMiddlewares(app: Express): void {
  app.use(bodyParser);
  app.use(cors);
  app.use(logger);
}
