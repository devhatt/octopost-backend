import { mockDeep } from 'vitest-mock-extended';
import type { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/react-native.js';
import { UserController } from './user-controller.js';
import { HttpError } from '@/shared/errors/http-error.js';
import type { Validator } from '@/shared/infra/validator/validator.js';
import type { Service } from '@/shared/protocols/service.js';
import { UserMock } from '@/shared/test-helpers/mocks/user.mock.js';
import { ConflictError } from '@/shared/errors/conflict-error.js';

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

  class UserFindByIdServiceStub implements Service {
    public execute(params: any): any {
      return params;
    }
  }

  const validator = new ValidatorStub();
  const userCreateService = new UserCreateServiceStub();
  const userFindByIdService = new UserFindByIdServiceStub();

  const userController = new UserController(
    validator,
    userCreateService,
    userFindByIdService
  );

  const req = mockDeep<Request>();
  const res = mockDeep<Response>();
  const next = vi.fn();

  return {
    next,
    req,
    res,
    userController,
    userCreateService,
    userFindByIdService,
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
        repeatPassword: 'valid_password',
        username: 'valid_username',
      };

      req.body = body;

      await userController.create(req, res, next);

      expect(serviceSpy).toHaveBeenCalledWith({
        email: body.email,
        name: body.name,
        password: body.password,
        repeatPassword: body.repeatPassword,
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

    it('should throw conflict error if existing username or email', async () => {
      const { next, req, res, userController, userCreateService } = makeSut();
      const error = new ConflictError(
        'There is already a user with this email or username'
      );
      vi.spyOn(userCreateService, 'execute').mockRejectedValueOnce(
        new PrismaClientKnownRequestError(
          'There is already a user with this email or username',
          {
            clientVersion: '5.13.0',
            code: 'P2002',
          }
        )
      );

      await userController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
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

  describe('userFindById', () => {
    it('should call validator with correctly params', async () => {
      const { next, req, res, userController, validator } = makeSut();

      const validateSpy = vi.spyOn(validator, 'validate');

      const uuid = crypto.randomUUID();

      req.params = { id: uuid };
      req.path = '/users';

      await userController.userFindById(req, res, next);

      expect(validateSpy).toHaveBeenCalledWith(expect.anything(), {
        params: req.params,
        path: req.path,
      });
    });

    it('should call service with correctly params', async () => {
      const { next, req, res, userController, userFindByIdService } = makeSut();

      const serviceSpy = vi.spyOn(userFindByIdService, 'execute');

      const uuid = crypto.randomUUID();

      req.params.id = uuid;

      await userController.userFindById(req, res, next);

      expect(serviceSpy).toHaveBeenCalledWith({
        id: req.params.id,
      });
    });

    it('should response 404 if user is not found', async () => {
      const { next, req, res, userController, userFindByIdService } = makeSut();

      const serviceSpy = vi.spyOn(userFindByIdService, 'execute');

      const response = undefined;

      serviceSpy.mockReturnValue(response);

      const uuid = crypto.randomUUID();

      req.params.id = uuid;

      await userController.userFindById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should call next when an error', async () => {
      const { next, req, res, userController, userFindByIdService } = makeSut();
      const error = new HttpError(500, 'error');

      vi.spyOn(userFindByIdService, 'execute').mockRejectedValueOnce(
        new HttpError(500, 'error')
      );

      await userController.userFindById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
