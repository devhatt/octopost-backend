import type { RequestHandler } from 'express';
import type { UserCreateModel } from '../models/user-create-model';
import type { UserFindByIdModel } from '../models/user-find-by-id-model';
import { userCreateSchema, userFindByIdSchema } from '../validators/index';
import { userIdParamsSchema } from '../validators/user-id-schema';
import type { Validator } from '@/shared/infra/validator/validator';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { HttpStatusCode } from '@/shared/protocols/http-client';
import type { Service } from '@/shared/protocols/service';

export class UserController implements Controller {
  create: AsyncRequestHandler = async (req, res, next) => {
    try {
      this.validator.validate(userCreateSchema, {
        body: req.body,
      });

      const response = await this.serviceCreate.execute({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        repeatPassword: req.body.password,
        username: req.body.username,
      });

      return res.status(HttpStatusCode.created).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAccounts: RequestHandler = (req, res, next) => {
    try {
      this.validator.validate(userIdParamsSchema, {
        params: req.params,
      });

      return res.status(HttpStatusCode.ok).json({});
    } catch (error) {
      next(error);
    }
  };

  userFindById: AsyncRequestHandler = async (req, res, next) => {
    try {
      this.validator.validate(userFindByIdSchema, {
        params: req.params,
        path: req.path,
      });

      const user = await this.serviceFindById.execute({
        id: req.params.id,
      });

      if (!user) {
        return res
          .status(HttpStatusCode.notFound)
          .json({ error: 'User not found' });
      }

      return res.status(HttpStatusCode.ok).json(user);
    } catch (error) {
      next(error);
    }
  };

  constructor(
    private validator: Validator,
    private serviceCreate: Service<UserCreateModel>,
    private serviceFindById: Service<UserFindByIdModel>
  ) {}
}
