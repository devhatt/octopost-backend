import type { Express } from 'express';
import { cors } from '@/middlewares/cors/cors';
import { bodyParser } from '@/middlewares/body-parser';

export default function setupMiddlewares(app: Express): void {
  app.use(bodyParser);
  app.use(cors);
}
