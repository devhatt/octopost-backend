import morgan from 'morgan';

export const httpLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms'
);
