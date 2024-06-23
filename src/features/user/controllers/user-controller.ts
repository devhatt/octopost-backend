import type { RequestHandler } from 'express';

import type { UserCreateService } from '@/features/user/services/user-create-service';
import type { UserFindByIdService } from '@/features/user/services/user-find-by-id-service';
import {
  userCreateBodySchema,
  userFindByIdParamsSchema,
} from '@/features/user/validators';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { HttpStatusCode } from '@/shared/protocols/http-client';

export class UserController implements Controller {
  create: AsyncRequestHandler = async (req, res, next) => {
    try {
      const { email, name, password, repeatPassword, username } =
        userCreateBodySchema.parse(req.body);

      const response = await this.serviceCreate.execute({
        email,
        name,
        password,
        repeatPassword,
        username,
      });

      return res.status(HttpStatusCode.created).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAccounts: RequestHandler = (req, res, next) => {
    try {
      const { id } = userFindByIdParamsSchema.parse(req.params);

      return res.status(HttpStatusCode.ok).json({ id });
    } catch (error) {
      next(error);
    }
  };

  userFindById: AsyncRequestHandler = async (req, res, next) => {
    try {
      const { id } = userFindByIdParamsSchema.parse(req.params);

      const user = await this.serviceFindById.execute({
        id,
      });

      return res.status(HttpStatusCode.ok).json(user);
    } catch (error) {
      next(error);
    }
  };

  constructor(
    private serviceCreate: UserCreateService,
    private serviceFindById: UserFindByIdService
  ) {}
}
