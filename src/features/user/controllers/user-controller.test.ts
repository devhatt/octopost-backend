import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import { GetUserAccountsService } from '@/features/account/services/get-user-accounts-service';
import { UserCreateService } from '@/features/user/services/user-create-service';
import { UserFindByIdService } from '@/features/user/services/user-find-by-id-service';
import { HttpError } from '@/shared/errors/http-error';
import { UserNotFound } from '@/shared/errors/user-not-found-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';
import { accountRepositoryMock } from '@/shared/test-helpers/mocks/repositories/account-repository.mock';
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

  const mockGetUserAccountsService = mock<GetUserAccountsService>(
    new GetUserAccountsService(userRepositoryMock, accountRepositoryMock)
  );

  const userController = new UserController(
    mockUserCreateService,
    mockUserFindByIdService,
    mockGetUserAccountsService
  );

  const req = mockDeep<Request>();
  const res = {
    json: vi.fn(),
    send: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn();

  return {
    getUserAccountsService: mockGetUserAccountsService,
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
    it('calls next when validation fails', async () => {
      const { next, req, res, userController } = makeSut();
      const invalidBody = {
        email: 'invalid_email@domain.com',
        name: 1,
        password: 'Invalid_password@',
        repeatPassword: 'Mismatch_password@',
      };

      req.body = invalidBody;

      await userController.create(req, res, next);

      expect(next).toHaveBeenCalled();
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
    it('calls next when validation fails', async () => {
      const { next, req, res, userController } = makeSut();

      req.params = { id: 'invalid-uuid' };

      await userController.userFindById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getAccounts', () => {
    it('should call next with an error if user not found', async () => {
      const { getUserAccountsService, next, req, res, userController } =
        makeSut();

      vi.spyOn(getUserAccountsService, 'execute').mockRejectedValueOnce(
        new UserNotFound()
      );

      const uuid = randomUUID();
      req.params = {
        id: uuid,
      };

      await userController.getAccounts(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error('User not found'));
    });
    it('calls next when validation fails', async () => {
      const { next, req, res, userController } = makeSut();

      req.params = { id: 'invalid-uuid' };

      await userController.getAccounts(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return accounts from user', async () => {
      const { getUserAccountsService, next, req, res, userController } =
        makeSut();

      const accounts = [
        {
          avatarUrl: 'avatar-url',
          id: 'id1',
          socialMedia: { id: 1, name: 'social-name' },
        },
        {
          avatarUrl: 'avatar-url',
          id: 'id2',
          socialMedia: { id: 2, name: 'social-name' },
        },
      ];
      vi.spyOn(getUserAccountsService, 'execute').mockResolvedValueOnce({
        accounts,
      });

      const uuid = randomUUID();
      req.params = {
        id: uuid,
      };
      await userController.getAccounts(req, res, next);

      expect(res.status).toHaveBeenCalledWith(HttpStatusCode.ok);
      expect(res.json).toHaveBeenCalledWith(accounts);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
