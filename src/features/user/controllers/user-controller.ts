import type { UserCreateModel } from '../models/user-create-model.js';
import { userCreateSchema, userGetSchema } from '../validators/index.js';
import type { UserRepository } from '../repositories/user-repository/user-repository.js';
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

  getUser: AsyncRequestHandler = async (req, res, next) => {
    try {
      const userId = req.params.id;

      this.validator.validate(userGetSchema, {
        id: userId,
      });

      let user = await this.userRepository.findById(userId);

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
    private userRepository: UserRepository
  ) {}
}
