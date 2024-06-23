import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import { UserCreateService } from '@/features/user/services/user-create-service';
import { UserFindByIdService } from '@/features/user/services/user-find-by-id-service';
import { HttpError } from '@/shared/errors/http-error';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';

import { UserController } from './user-controller';

const makeSut = () => {
  const mockUserCreateService = mock<UserCreateService>(
    new UserCreateService(userRepositoryMock, {
      compare: vi.fn(),
      encrypt: vi.fn(),
    })
  );
  const mockUserFindByIdService = mock<UserFindByIdService>(
    new UserFindByIdService(userRepositoryMock)
  );

  const userController = new UserController(
    mockUserCreateService,
    mockUserFindByIdService
  );

  const req = mockDeep<Request>();
  const res = mockDeep<Response>();
  const next = vi.fn();

  return {
    next,
    req,
    res,
    userController,
    userCreateService: mockUserCreateService,
    userFindByIdService: mockUserFindByIdService,
  };
};

describe('[Controllers] UserController', () => {
  describe('create', () => {
    it('should call service with correctly params', async () => {
      const { next, req, res, userController, userCreateService } = makeSut();

      const serviceSpy = vi.spyOn(userCreateService, 'execute');

      const body = {
        email: 'valid_email@domain.com',
        name: 'valid_name',
        password: 'Valid_password@',
        repeatPassword: 'Valid_password@',
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

    it('should throw error', async () => {
      const { next, req, res, userController, userCreateService } = makeSut();

      const body = {
        email: 'valid_email@domain.com',
        name: 'valid_name',
        password: 'Valid_password@',
        repeatPassword: 'Valid_password@',
        username: 'valid_username',
      };

      req.body = body;

      const userCreateSpy = vi
        .spyOn(userCreateService, 'execute')
        .mockRejectedValueOnce(new HttpError(500, 'error'));

      await userController.create(req, res, next);

      expect(userCreateSpy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));

      await userController.create(req, res, next);

      expect(userCreateSpy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('userFindById', () => {
    it('should call service with correctly params', async () => {
      const { next, req, res, userController, userFindByIdService } = makeSut();

      const serviceSpy = vi.spyOn(userFindByIdService, 'execute');

      const uuid = randomUUID();

      req.params = {
        id: uuid,
      };

      await userController.userFindById(req, res, next);

      expect(serviceSpy).toHaveBeenCalledWith({
        id: uuid,
      });
    });

    it('should call next when an error', async () => {
      const { next, req, res, userController, userFindByIdService } = makeSut();

      req.params = {
        id: randomUUID(),
      };

      const userFindSpy = vi
        .spyOn(userFindByIdService, 'execute')
        .mockRejectedValueOnce(new HttpError(500, 'error'));

      await userController.userFindById(req, res, next);

      expect(userFindSpy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
