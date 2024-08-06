import { env } from '@/config/env';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

export class MetaAuthController implements Controller {
  authenticate: AsyncRequestHandler = async (req, res, next) => {
    try {
      const urlFacebook = new URLSearchParams({
        client_id: env.META_CLIENT_ID,
        redirect_uri: 'http://localhost:3000/api/meta/callback',
        state: 'public_profile',
      });
      console.log(urlFacebook);

      res.json({
        urlFacebook:
          'https://www.facebook.com/v20.0/dialog/oauth?' +
          urlFacebook.toString(),
      });
    } catch (error) {
      next(error);
    }
  };

  callBack: AsyncRequestHandler = async (req, res, next) => {
    try {
      const tokenQuery = req.query['code']!;

      const urlFacebook = new URLSearchParams({
        client_id: env.META_CLIENT_ID,
        client_secret: env.META_CLIENT_SECRET,
        code: tokenQuery?.toString(),
        redirect_uri: 'http://localhost:3000/api/meta/callback',
      });

      res.json({
        urlFacebook:
          'https://graph.facebook.com/v20.0/oauth/access_token?' +
          urlFacebook.toString(),
      });
    } catch (error) {
      next(error);
    }
  };
}
