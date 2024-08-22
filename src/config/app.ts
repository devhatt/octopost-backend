import Express from 'express';

import { setupHealthCheck } from '@/config/healthcheck';
import { setupMiddlewares } from '@/config/middlewares';
import { setupRoutes } from '@/config/routes';

const app = Express();

setupRoutes(app);
setupMiddlewares(app);
setupHealthCheck(app);

export { app };
