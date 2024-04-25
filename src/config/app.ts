import Express from 'express';
import setupRoutes from './routes.js';
import setupMiddlewares from './middlewares.js';

const app = Express();

setupRoutes(app);
setupMiddlewares(app);

export default app;
