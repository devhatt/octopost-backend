import { HttpError } from '@/shared/errors/HttpError';
import { UserController } from './user-controller';
import type { Validator } from '@/shared/infra/validator/validator';
import type { Service } from '@/shared/protocols/service';

const makeSut = () => {
  class ValidatorStub implements Validator {
    public validate(schema: any, data: any): boolean {
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

  let req: any = {
    body: {
      email: 'valid_email@domain.com',
      password: 'valid_password',
    },
  };
  let next: any = vi.fn();
  let res: any = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  };

  return {
    validator,
    userCreateService,
    userController,
    req,
    res,
    next,
  };
};

describe('[Controllers] UserController', () => {
  describe('create', () => {
    it('should call validator with correctly params', async () => {
      const { userController, res, req, next, validator } = makeSut();

      const validateSpy = vi.spyOn(validator, 'validate');

      const body = {
        email: 'valid_email@domain.com',
        password: 'valid_password',
      };

      req.body = body;

      await userController.create(req, res, next);

      expect(validateSpy).toHaveBeenCalledWith(expect.anything(), { body });
    });

    it('should call service with correctly params', async () => {
      const { userController, userCreateService, res, req, next } = makeSut();

      const serviceSpy = vi.spyOn(userCreateService, 'execute');

      const body = {
        email: 'valid_email@domain.com',
        password: 'valid_password',
      };

      req.body = body;

      await userController.create(req, res, next);

      expect(serviceSpy).toHaveBeenCalledWith({
        email: body.email,
        password: body.password,
      });
    });

    it('should response 200 with password and email', async () => {
      const { userController, userCreateService, res, req, next } = makeSut();

      const serviceSpy = vi.spyOn(userCreateService, 'execute');

      const response = {
        email: 'valid_email@domain.com',
        password: 'valid_password',
      };

      serviceSpy.mockReturnValue(response);

      await userController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(response);
    });

    it('should call next when an error ', async () => {
      const { userController, userCreateService, res, req, next } = makeSut();
      const error = new HttpError(500, 'error');

      vi.spyOn(userCreateService, 'execute').mockRejectedValueOnce(
        new HttpError(500, 'error')
      );

      const response = {
        email: 'valid_email@domain.com',
        password: 'valid_password',
      };

      await userController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
