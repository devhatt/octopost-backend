import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';
import { createRestAPIClient } from 'masto';

import { env } from '@/config/env';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

//FIXME: ORGNIZATION SERV/CONTROLLER....
export class MastodonService {
  // eslint-disable-next-line @typescript-eslint/require-await
  authenticate: AsyncRequestHandler = async (
    _: Request,
    res: Response,
    __: NextFunction
  ) => {
    const url = 'https://mastodon.social/oauth/authorize/';

    const urlMastodon = new URLSearchParams({
      client_id: 'devhatt',
      code: 'auth-code',
      grant_type: 'authorization_code',
      redirect_uris: 'http://localhost:3000/api/mastodon/callback',
      response_type: 'code',
      scopes: 'read write follow',
    });

    res.json({
      urlMastodon: url + urlMastodon.toString(),
    });
  };

  callback: AsyncRequestHandler = async (
    req: Request,
    res: Response,
    _: NextFunction
  ) => {
    const { message } = req.body;

    const masto = createRestAPIClient({
      accessToken: env.MASTODON_CLIENT_ACESS_TOKEN,
      url: env.MASTODON_REDIRECT_URL,
    });

    const status = await masto.v1.statuses.create({
      status: message,
    });

    res.status(200).send(status);
  };

  createApp: AsyncRequestHandler = async (
    req: Request,
    res: Response,
    _: NextFunction
  ) => {
    const { client_name, client_uris } = req.query;

    const urlMastodonCreateApp = new URLSearchParams({
      client_name: String(client_name),
      redirect_uris: String(client_uris),
      scopes: 'read write follow',
    });

    const { data } = await axios.post(
      `https://mastodon.social/api/v1/apps?` + urlMastodonCreateApp.toString()
    );

    console.log(data);
    res.json({
      url: data,
    });
  };
}
