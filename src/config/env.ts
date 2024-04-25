import dotenv from 'dotenv';

if (process.env['MODE'] === 'DEV') {
  dotenv.config({
    path: ['.env.dev', '.env'],
  });
} else if (process.env['MODE'] === 'PROD') {
  dotenv.config({
    path: ['.env.prod', '.env'],
  });
} else if (process.env['MODE'] === 'QA') {
  dotenv.config({
    path: ['.env.qa', '.env'],
  });
} else {
  dotenv.config({
    path: ['.env'],
  });
}

export default {
  PORT: process.env['PORT'],
  HOSTNAME: process.env['HOSTNAME'],
} as Record<string, string>;
