import path from 'node:path';
import type { Express } from 'express';
import { glob } from 'glob';
import { errorHandler } from '@/middlewares/error-handler/error-handler.js';

export default function setupRoutes(app: Express) {
  const routes = glob.sync([
    path.resolve(import.meta.dirname, '../features/**/routes/*-routes.ts'),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  routes.map(async (file) => {
    const route = await import(file);
    const { prefix, router } = route.default;
    app.use(`/api/${prefix}`, router, errorHandler);
  });
}
