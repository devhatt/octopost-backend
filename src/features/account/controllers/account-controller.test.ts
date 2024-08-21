import type { Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { mock, mockDeep } from 'vitest-mock-extended';

import { HttpStatusCode } from '@/shared/protocols/http-client';

import type { DeleteUserAccountsService } from '../services/delete-user-accounts-service';
import { AccountController } from './account-controller';

const makeSut = () => {
  const deleteUserAccountServiceMock = mock<DeleteUserAccountsService>({
    execute: vi.fn(),
  });
  const accountController = new AccountController(deleteUserAccountServiceMock);

  const req = mockDeep<Request>();
  const res = {
    send: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn();

  return {
    accountController,
    deleteUserAccountService: deleteUserAccountServiceMock,
    next,
    req,
    res,
  };
};

describe('deleteAccountById', () => {
  it('should delete an account and return no content status', async () => {
    const { accountController, deleteUserAccountService, next, req, res } =
      makeSut();

    const socialMediaId = 123;
    req.params = { id: socialMediaId };

    const executeSpy = vi
      .spyOn(deleteUserAccountService, 'execute')
      .mockResolvedValue();

    await accountController.deleteAccountById(req, res, next);

    expect(executeSpy).toHaveBeenCalledWith({
      socialMediaId,
    });

    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.noContent);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
