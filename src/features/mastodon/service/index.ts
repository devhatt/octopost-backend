import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';

import { env } from '@/config/env';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

//FIXME: https://docs.joinmastodon.org/client/authorized/#client

//FIXME: ORGNIZATION SERV/CONTROLLER....
export class MastodonService {
  authenticate: AsyncRequestHandler = async (
    req: Request,
    res: Response,
    _: NextFunction
  ) => {
    const { code } = req.query;

    const { data } = await axios.post(
      `https://mastodon.social/oauth/token?grant_type=client_credentials&client_id=${env.MASTODON_CLIENT_KEY}&client_secret=${env.MASTODON_CLIENT_SECRET}&redirect_uri=${env.MASTODON_REDIRECT_URL}&code=${code}`
    );

    res.send(data);
  };

  authorize: AsyncRequestHandler = (
    _: Request,
    res: Response,
    __: NextFunction
  ) => {
    //FIXME: CHANGE TO RES.REDIRECT()

    const { url } = {
      url: `https://mastodon.social/oauth/authorize?response_type=code&client_id=${env.MASTODON_CLIENT_KEY}&redirect_uri=${env.MASTODON_REDIRECT_URL}`,
    };

    res.json(url);
  };

  status: AsyncRequestHandler = async (
    req: Request,
    _: Response,
    __: NextFunction
  ) => {
    const body = {
      media_ids: req.query.media_ids,
      poll: {
        expires_in: 3600,
        options: 3600,
      },
      status: req.body.status,
    };
    await axios.post(
      'https://mastodon.social/api/v1/statuses',
      {
        ...body,
      },
      {
        headers: {
          Authorization: `Bearer ${req.query.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  };
}
