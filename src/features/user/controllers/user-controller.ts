import type { UserCreateModel } from '../models/user-create-model.js';
import { userCreateSchema, userFindByIdSchema } from '../validators/index.js';
import type { UserFindByIdModel } from '../models/user-find-by-id-model.js';
import type { Controller } from '@/shared/protocols/controller.js';
import type { Service } from '@/shared/protocols/service.js';
import type { Validator } from '@/shared/infra/validator/validator.js';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers.js';
import { HttpStatusCode } from '@/shared/protocols/http-client.js';

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
        username: req.body.username,
      });

      return res.status(HttpStatusCode.created).json(response);
    } catch (error) {
      next(error);
    }
  };

  userFindById: AsyncRequestHandler = async (req, res, next) => {
    try {
      this.validator.validate(userFindByIdSchema, {
        body: req.body,
        params: req.params,
        path: req.path,
        query: req.query,
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
