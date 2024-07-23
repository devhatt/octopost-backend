import type { NextFunction, Request, Response } from 'express';
import type { MockProxy } from 'vitest-mock-extended';
import { mock } from 'vitest-mock-extended';

import type { AccountRepository } from '../repositories/account-repository/account-repository';
import { DeleteUserAccountsService } from '../services/delete-user-accounts-service';
import { AccountController } from './account-controller';

describe('Account Controller', () => {
  let accountRepository: MockProxy<AccountRepository>;
  let deleteAccountByIdService: DeleteUserAccountsService;
  let accountController: AccountController;

  beforeEach(() => {
    accountRepository = mock<AccountRepository>();
    deleteAccountByIdService = new DeleteUserAccountsService(accountRepository);
    accountController = new AccountController(deleteAccountByIdService);
  });

  it('should be able to delete an account by id', async () => {
    const req = mock<Request>();
    req.params.id = 'f19c169c-5fa2-406d-8de9-4d2c36dc6529';

    const res = mock<Response>();
    res.status.mockReturnThis();
    res.send.mockReturnThis();

    const next = mock<NextFunction>();

    await accountController.deleteAccountById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
