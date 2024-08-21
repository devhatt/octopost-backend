import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { HttpStatusCode } from '@/shared/protocols/http-client';

import type { DeleteUserAccountsService } from '../services/delete-user-accounts-service';
import { accountDeleteBySchema } from '../validators/account-find-by-id-schema';

export class AccountController implements Controller {
  deleteAccountById: AsyncRequestHandler = async (req, res, next) => {
    try {
      const { id } = accountDeleteBySchema.parse(req.params);

      await this.deleteUserAccountService.execute({
        socialMediaId: id,
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
