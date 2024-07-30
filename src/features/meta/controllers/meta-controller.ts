import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

export class MetaAuthController implements Controller {
  authenticate: AsyncRequestHandler = async (req, res, next) => {
    try {
      const urlFacebook = new URLSearchParams({
        client_id: '481540744480253',
        redirect_uri: 'http://localhost:3000/api/meta/callback',
        state: 'public_profile',
      });

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
        client_id: '481540744480253',
        client_secret: '4569f22252332a44dc4016d7d35273b1',
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
