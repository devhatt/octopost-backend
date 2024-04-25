import type { Express } from 'express';
import { cors } from '@/middlewares/cors/cors.js';
import { bodyParser } from '@/middlewares/body-parser/body-parser.js';
import healthcheck from './healthcheck.js';

export default function setupMiddlewares(app: Express): void {
  app.use(bodyParser);
  app.use(cors);
  app.use(healthcheck);
}
