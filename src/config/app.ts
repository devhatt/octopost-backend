import Express from 'express';

import { setupHealthCheck } from '@/config/healthcheck';
import { setupMiddlewares } from '@/config/middlewares';
import { setupRoutes } from '@/config/routes';

const app = Express();

setupHealthCheck(app);
setupMiddlewares(app);
setupRoutes(app);
export { app };
