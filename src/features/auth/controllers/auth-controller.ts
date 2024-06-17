import { authSchema } from '../validators/auth-schema';
import type { Validator } from '@/shared/infra/validator/validator';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { HttpStatusCode } from '@/shared/protocols/http-client';
import type { Service } from '@/shared/protocols/service';

export class AuthController implements Controller {
  login: AsyncRequestHandler = async (req, res, next) => {
    try {
      this.validator.validate(authSchema, {
        body: req.body,
      });
      const response = await this.authService.execute({
        password: req.body.password,
        username: req.body.username,
      });

      return res.status(HttpStatusCode.ok).json(response);
    } catch (error) {
      next(error);
    }
  };
  constructor(
    private validator: Validator,
    private authService: Service<unknown>
  ) {}
}
