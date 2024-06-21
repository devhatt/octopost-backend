import { authBodySchema } from '@/features/auth/validators/auth-schema';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { HttpStatusCode } from '@/shared/protocols/http-client';

export class AuthController implements Controller {
  login: AsyncRequestHandler = async (req, res, next) => {
    try {
      const _ = authBodySchema.parse(req.body);

      // const response = await this.authService.execute({
      //   password: req.body.password,
      //   username: req.body.username,
      // });

      await Promise.resolve();
      return res.status(HttpStatusCode.ok).send();
    } catch (error) {
      next(error);
    }
  };

  constructor(private authService: unknown) {}
}
