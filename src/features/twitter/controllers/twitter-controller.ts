import type { AuthorizeTwitterService } from '@/features/twitter/services/authorize-twitter-service';
import type { LoginTwitterService } from '@/features/twitter/services/login-twitter-service';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';

export class TwitterController implements Controller {
  callback: AsyncRequestHandler = async (req, res) => {
    const query = req.query;

    await this.authorizeTwitter.execute({
      code: String(query.code),
      state: String(query.state),
    });

    return res.send();
  };

  login: AsyncRequestHandler = (req, res) => {
    try {
      const url = this.loginTwitter.execute({
        authorization: req.headers.authorization,
      });

      return res.json(url);
    } catch (err) {
      return res.status(401).json({ message: (err as Error).message });
    }
  };

  constructor(
    private readonly authorizeTwitter: AuthorizeTwitterService,
    private readonly loginTwitter: LoginTwitterService
  ) {}
}
