import { randomUUID } from 'crypto';
import type { NextFunction, Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import { GetUserAccountsService } from '@/features/account/services/get-user-accounts-service';
import { UserController } from '@/features/user/controllers/user-controller';
import { UserCreateService } from '@/features/user/services/user-create-service';
import { UserFindByIdService } from '@/features/user/services/user-find-by-id-service';
import { HttpError } from '@/shared/errors/http-error';
import { UserNotFound } from '@/shared/errors/user-not-found-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';
import { bcryptAdapteMock } from '@/shared/test-helpers/mocks/bcryptAdapter.mock';
import { accountRepositoryMock } from '@/shared/test-helpers/mocks/repositories/account-repository.mock';
import { userRepositoryMock } from '@/shared/test-helpers/mocks/repositories/user-repository.mock';

describe('[Controllers] UserController', () => {
  let mockUserCreateService: UserCreateService;
  let mockUserFindByIdService: UserFindByIdService;
  let mockGetUserAccountsService: GetUserAccountsService;
  let userController: UserController;

  let req: Request;
  let res: Response;
  let next: NextFunction;
  let error: HttpError;

  beforeEach(() => {
    mockUserCreateService = mock<UserCreateService>(
      new UserCreateService(userRepositoryMock, bcryptAdapteMock)
    );

    mockUserFindByIdService = mock<UserFindByIdService>(
      new UserFindByIdService(userRepositoryMock)
    );

    mockGetUserAccountsService = mock<GetUserAccountsService>(
      new GetUserAccountsService(userRepositoryMock, accountRepositoryMock)
    );

    userController = new UserController(
      mockUserCreateService,
      mockUserFindByIdService,
      mockGetUserAccountsService
    );

    req = mockDeep<Request>();

    res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    next = vi.fn() as unknown as NextFunction;

    error = new HttpError(HttpStatusCode.serverError, 'error');
  });

  describe('create', () => {
    it('should call service with correctly params', async () => {
      const serviceSpy = vi.spyOn(mockUserCreateService, 'execute');

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
      const body = {
        email: 'valid_email@domain.com',
        name: 'valid_name',
        password: 'Valid_password@',
        repeatPassword: 'Valid_password@',
        username: 'valid_username',
      };

      req.body = body;

      vi.spyOn(mockUserCreateService, 'execute').mockRejectedValueOnce(error);

      await userController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it('calls next when validation fails', async () => {
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
      const serviceSpy = vi.spyOn(mockUserFindByIdService, 'execute');

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
      req.params = {
        id: randomUUID(),
      };

      const userFindSpy = vi
        .spyOn(mockUserFindByIdService, 'execute')
        .mockRejectedValueOnce(error);

      await userController.userFindById(req, res, next);

      expect(userFindSpy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
    it('calls next when validation fails', async () => {
      req.params = { id: 'invalid-uuid' };

      await userController.userFindById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getAccounts', () => {
    it('should call next with an error if user not found', async () => {
      vi.spyOn(mockGetUserAccountsService, 'execute').mockRejectedValueOnce(
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
      req.params = { id: 'invalid-uuid' };

      await userController.getAccounts(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return accounts from user', async () => {
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
      vi.spyOn(mockGetUserAccountsService, 'execute').mockResolvedValueOnce({
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
