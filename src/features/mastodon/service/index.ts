import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';
import { createRestAPIClient } from 'masto';

import { env } from '@/config/env';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

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

    console.log(data);

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

  hello: AsyncRequestHandler = async (
    req: Request,
    res: Response,
    __: NextFunction
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
}
