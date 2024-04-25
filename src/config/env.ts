import dotenv from 'dotenv';

if (process.env['MODE'] === 'DEV') {
  dotenv.config({
    path: ['.env.dev', '.env'],
  });
}

if (process.env['MODE'] === 'PROD') {
  dotenv.config({
    path: ['.env.prod', '.env'],
  });
}

if (process.env['MODE'] === 'QA') {
  dotenv.config({
    path: ['.env.qa', '.env'],
  });
}

export default {
  PORT: process.env['PORT'],
  HOSTNAME: process.env['HOSTNAME'],
  OAUTH_MASTODON_CLIENT_SECRET: process.env['OAUTH_MASTODON_CLIENT_SECRET'],
  OAUTH_MASTODON_CLIENT_ID: process.env['OAUTH_MASTODON_CLIENT_ID'],
} as Record<string, string>;
