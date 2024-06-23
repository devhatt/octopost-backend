import Express from 'express';

import { setupHealthCheck } from './healthcheck';
import { setupMiddlewares } from './middlewares';
import { setupRoutes } from './routes';

const app = Express();

setupRoutes(app);
setupMiddlewares(app);
setupHealthCheck(app);

export { app };
