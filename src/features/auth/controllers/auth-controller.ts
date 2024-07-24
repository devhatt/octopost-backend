import { ZodError } from 'zod';

import { authBodySchema } from '@/features/auth/validators/auth-schema';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { HttpStatusCode } from '@/shared/protocols/http-client';

import type { AuthLoginService } from '../services/auth-login-service';

export class AuthController implements Controller {
  // confirmation: AsyncRequestHandler = async (req, res, next) => {
  //   const { token } = req.query;

  //   try {
  //     await this.confirmationService.execute({
  //       token,
  //     });

  //     return res.status(HttpStatusCode.noContent).send();
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  login: AsyncRequestHandler = async (req, res, next) => {
    try {
      const { password, username } = authBodySchema.parse(req.body);

      const { token } = await this.authLoginService.execute({
        password,
        username,
      });

      return res.status(HttpStatusCode.ok).json({ token });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(409).send({
          issues: error.format(),
          message: 'Validation error',
        });
      }
      next(error);
    }
  };

  constructor(private authLoginService: AuthLoginService) {}
}
