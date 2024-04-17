import Express from 'express';
import setupRoutes from './routes';
import setupMiddlewares from './middlewares';

const app = Express();

setupRoutes(app);
setupMiddlewares(app);

export default app;
