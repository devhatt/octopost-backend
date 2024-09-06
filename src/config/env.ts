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
  MASTODON_CLIENT_ACESS_TOKEN: process.env['MASTODON_CLIENT_ACESS_TOKEN'],
  MASTODON_CLIENT_KEY: process.env['MASTODON_CLIENT_KEY'],
  MASTODON_CLIENT_SECRET: process.env['MASTODON_CLIENT_SECRET'],
  MASTODON_INSTANCE_NAME: process.env['MASTODON_INSTANCE_NAME'],
  MASTODON_INSTANCE_URI: process.env['MASTODON_INSTANCE_URI'],
  MASTODON_REDIRECT_URL: process.env['MASTODON_REDIRECT_URL'],
  MASTODON_SCOPES: process.env['MASTODON_SCOPES'],
  PORT: process.env['PORT'] || 3000,
  SECRET_KEY: process.env['SECRET_KEY'] || 'secret_key',
} as Record<string, string>;
