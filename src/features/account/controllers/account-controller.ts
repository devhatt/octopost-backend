import type { DeleteUserAccountsService } from '@/features/account/services/delete-user-accounts-service';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { HttpStatusCode } from '@/shared/protocols/http-client';

export class AccountController implements Controller {
  deleteAccountById: AsyncRequestHandler = async (req, res, next) => {
    try {
      const accountId = Number(req.params.id);

      await this.deleteUserAccountService.execute({
        socialMediaId: accountId,
      });

      return res.status(HttpStatusCode.noContent).send();
    } catch (error) {
      next(error);
    }
  };

  constructor(
    private readonly deleteUserAccountService: DeleteUserAccountsService
  ) {}
}
