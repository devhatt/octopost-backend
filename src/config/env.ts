import dotenv from 'dotenv';

switch (process.env['MODE']) {
  case 'DEV': {
    dotenv.config({
      path: ['.env.dev', '.env'],
    });

    break;
  }
  case 'PROD': {
    dotenv.config({
      path: ['.env.prod', '.env'],
    });

    break;
  }
  case 'QA': {
    dotenv.config({
      path: ['.env.qa', '.env'],
    });

    break;
  }
  default: {
    dotenv.config({
      path: ['.env'],
    });
  }
}

export const env = {
  HOSTNAME: process.env['HOSTNAME'] || 'localhost',
  PORT: process.env['PORT'] || 3000,
  SECRET_KEY: process.env['SECRET_KEY'] || '321',
} as Record<string, string>;
