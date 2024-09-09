import type { Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import { AccountController } from '@/features/account/controllers/account-controller';
import type { DeleteUserAccountsService } from '@/features/account/services/delete-user-accounts-service';
import { accountDeleteBySchema } from '@/features/account/validators/account-find-by-id-schema';
import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';

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

    const socialMediaId = '123';

    req.params = { id: socialMediaId };

    const executeSpy = vi
      .spyOn(deleteUserAccountService, 'execute')
      .mockResolvedValue();

    await accountController.deleteAccountById(req, res, next);

    expect(executeSpy).toHaveBeenCalledWith({
      socialMediaId: Number(socialMediaId),
    });

    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.noContent);

    expect(res.send).toHaveBeenCalled();

    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an error when service throws', async () => {
    const { accountController, deleteUserAccountService, next, req, res } =
      makeSut();

    const socialMediaId = '123';
    req.params = { id: socialMediaId };

    const error = new HttpError(HttpStatusCode.badRequest, 'Service error');

    vi.spyOn(deleteUserAccountService, 'execute').mockRejectedValueOnce(error);

    await accountController.deleteAccountById(req, res, next);

    expect(next).toHaveBeenCalledWith(error);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  describe('accountDeleteByschema', () => {
    it('should pass validation when id is a valid number', () => {
      const validInput = { id: 123 };
      const parsedData = accountDeleteBySchema.parse(validInput);

      expect(parsedData).toEqual({ id: validInput.id });
    });
  });
});
