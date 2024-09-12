import type { NextFunction, Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import { AccountController } from '@/features/account/controllers/account-controller';
import type { DeleteUserAccountsService } from '@/features/account/services/delete-user-accounts-service';
import { accountDeleteBySchema } from '@/features/account/validators/account-find-by-id-schema';
import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';

describe('deleteAccountById', () => {
  let deleteUserAccountServiceMock: DeleteUserAccountsService;

  let accountController: AccountController;

  let req: Request;
  let res: Response;
  let next: NextFunction;
  let error: HttpError;

  beforeEach(() => {
    deleteUserAccountServiceMock = mock<DeleteUserAccountsService>({
      execute: vi.fn(),
    });
    accountController = new AccountController(deleteUserAccountServiceMock);

    req = mockDeep<Request>();

    res = {
      json: vi.fn(),
      send: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    next = vi.fn() as unknown as NextFunction;

    error = new HttpError(HttpStatusCode.serverError, 'error');
  });
  it('should delete an account and return no content status', async () => {
    const socialMediaId = '123';

    req.params = { id: socialMediaId };

    const executeSpy = vi
      .spyOn(deleteUserAccountServiceMock, 'execute')
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
    const socialMediaId = '123';
    req.params = { id: socialMediaId };

    vi.spyOn(deleteUserAccountServiceMock, 'execute').mockRejectedValueOnce(
      error
    );

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

  it('should call next with an error if deleteUserAccountService.execute throws', async () => {
    vi.spyOn(deleteUserAccountServiceMock, 'execute').mockRejectedValueOnce(
      error
    );

    await accountController.deleteAccountById(req, res, next);

    expect(res.send).not.toHaveBeenCalled();
    expect(next).toBeCalledTimes(1);
  });
});
