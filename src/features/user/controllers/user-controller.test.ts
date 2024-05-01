import { mockDeep } from 'vitest-mock-extended';
import type { Request, Response } from 'express';
import { UserController } from './user-controller.js';
import { HttpError } from '@/shared/errors/http-error.js';
import type { Validator } from '@/shared/infra/validator/validator.js';
import type { Service } from '@/shared/protocols/service.js';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock.js';

const makeSut = () => {
  class ValidatorStub implements Validator {
    public validate(_: any, __: any): boolean {
      return true;
    }
  }

  class UserCreateServiceStub implements Service {
    public execute(params: any): any {
      return params;
    }
  }

  const validator = new ValidatorStub();
  const userCreateService = new UserCreateServiceStub();

  const userController = new UserController(validator, userCreateService);

  const req = mockDeep<Request>();
  const res = mockDeep<Response>();
  const next = vi.fn();

  return {
    next,
    req,
    res,
    userController,
    userCreateService,
    validator,
  };
};

describe('[Controllers] UserController', () => {
  describe('create', () => {
    it('should call validator with correctly params', async () => {
      const { next, req, res, userController, validator } = makeSut();

      const validateSpy = vi.spyOn(validator, 'validate');

      const body = UserMock.create();

      req.body = body;

      await userController.create(req, res, next);

      expect(validateSpy).toHaveBeenCalledWith(expect.anything(), { body });
    });

    it('should call service with correctly params', async () => {
      const { next, req, res, userController, userCreateService } = makeSut();

      const serviceSpy = vi.spyOn(userCreateService, 'execute');

      const body = {
        email: 'valid_email@domain.com',
        name: 'valid_name',
        password: 'valid_password',
        username: 'valid_username',
      };

      req.body = body;

      await userController.create(req, res, next);

      expect(serviceSpy).toHaveBeenCalledWith({
        email: body.email,
        name: body.name,
        password: body.password,
        username: body.username,
      });
    });

    it('should response 204 with password and email', async () => {
      const { next, req, res, userController, userCreateService } = makeSut();

      const serviceSpy = vi.spyOn(userCreateService, 'execute');

      const response = {
        email: 'valid_email@domain.com',
        password: 'valid_password',
      };

      serviceSpy.mockReturnValue(response);

      await userController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should call next when an error', async () => {
      const { next, req, res, userController, userCreateService } = makeSut();
      const error = new HttpError(500, 'error');

      vi.spyOn(userCreateService, 'execute').mockRejectedValueOnce(
        new HttpError(500, 'error')
      );

      await userController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
