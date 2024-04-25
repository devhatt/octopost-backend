import Express from 'express';
import setupRoutes from './routes.js';
import setupMiddlewares from './middlewares.js';
import { setupHealthCheck } from './healthcheck.js';

const app = Express();

setupRoutes(app);
setupMiddlewares(app);
setupHealthCheck(app);

export default app;
