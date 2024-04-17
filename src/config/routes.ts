import type { Express } from 'express';
import { glob } from 'glob';
import { resolve } from 'node:path';

export default function setupRoutes(app: Express) {
  const routes = glob.sync([
    resolve(import.meta.dirname, '../features/**/v1/*-routes.ts'),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  routes.map(async (file) => {
    const { router, prefix } = (await import(file)).default;
    app.use(`/v1/${prefix}`, router);
  });
}
