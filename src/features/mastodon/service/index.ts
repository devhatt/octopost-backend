import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';

import { env } from '@/config/env';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

//FIXME: https://docs.joinmastodon.org/methods/apps/#create

//FIXME: ORGNIZATION SERV/CONTROLLER....

export class MastodonService {
  authenticate: AsyncRequestHandler = async (
    req: Request,
    res: Response,
    _: NextFunction
  ) => {
    const { code } = req.query;
    const { data } = await axios.post(
      `https://mastodon.social/oauth/token?grant_type=authorization_code&client_id=${env.MASTODON_CLIENT_KEY}&client_secret=${env.MASTODON_CLIENT_SECRET}&redirect_uri=${env.MASTODON_REDIRECT_URL}&scope=${env.MASTODON_SCOPES}&code=${code}`
    );

    res.send(data);
  };

  authorize: AsyncRequestHandler = (
    _: Request,
    res: Response,
    __: NextFunction
  ) => {
    const { url } = {
      url: `https://mastodon.social/oauth/authorize?response_type=code&client_id=${env.MASTODON_CLIENT_KEY}&redirect_uri=${env.MASTODON_REDIRECT_URL}&code=user_authzcode_here`,
    };

    //FIXME: CHANGE TO RES.REDIRECT() NO FINAL DA API
    res.json({ url: url });
  };

  getUserId: AsyncRequestHandler = async (
    req: Request,
    res: Response,
    __: NextFunction
  ) => {
    const { name } = req.query;

    const { data } = await axios.get(
      `https://www.mastodon.social/api/v1/accounts/lookup?acct=${name}`
    );

    res.send({ data });
  };

  status: AsyncRequestHandler = async (
    req: Request,
    _: Response,
    __: NextFunction
  ) => {
    const body = {
      media_ids: req.body.media_ids,
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
