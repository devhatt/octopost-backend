import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@/shared/errors/HttpError';
import type { Controller } from '@/shared/protocols/controller';
import type { Service } from '@/shared/protocols/service';
import { UserCreateModel } from '../models/user-create-model';
import { Validator } from '@/shared/infra/validator/validator';
import { userCreateSchema } from '../validators';

export class UserController implements Controller {
  constructor(
    private validator: Validator,
    private serviceCreate: Service<UserCreateModel>
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.validator.validate(userCreateSchema, {
        body: req.body,
      });

      const response = await this.serviceCreate.execute({
        email: 'email',
        password: 'password',
      });

      return res.status(200).send(response);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.code).send({ message: error.message });
      }
      return res.status(500).send(error);
    }
  };
}
