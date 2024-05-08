import { authBodySchema } from '../validators/auth-schema.js';
import type { Validator } from '@/shared/infra/validator/validator.js';
import type { Controller } from '@/shared/protocols/controller.js';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers.js';
import { HttpStatusCode } from '@/shared/protocols/http-client.js';
import type { Service } from '@/shared/protocols/service.js';

export class AuthController implements Controller {
  login: AsyncRequestHandler = async (req, res, next) => {
    try {
      this.validator.validate(authBodySchema, {
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
