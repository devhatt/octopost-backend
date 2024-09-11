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

    // const tokenAcess = data.access_token;
    //TODO: ESPERAR O BANCO SUBIR PRA PODER ENVIAR O TOKEN E SALVAR
    res.status(200).send(data);
  };

  authorize: AsyncRequestHandler = (
    _: Request,
    res: Response,
    __: NextFunction
  ) => {
    const { url } = {
      url: `https://mastodon.social/oauth/authorize?response_type=code&client_id=${env.MASTODON_CLIENT_KEY}&redirect_uri=${env.MASTODON_REDIRECT_URL}&scope=${env.MASTODON_SCOPES}`,
    };

    //FIXME: CHANGE TO RES.REDIRECT() NO FINAL DA API
    res.json({ url: url });
  };

  status: AsyncRequestHandler = async (
    req: Request,
    res: Response,
    __: NextFunction
  ) => {
    const params = new URLSearchParams({
      media_ids: req.body.media_ids || null,
      status: req.body.status,
    });
    //preciso do auth do user

    await axios.post(
      `https://mastodon.social/api/v1/statuses?${params.toString()}`
    );

    res.status(200).send({ Message: 'Mensagem enviada com sucesso!' });
  };
}
