import { accountDeleteBySchema } from '@/features/account/validators/account-find-by-id-schema.js';
import type { Validator } from '@/shared/infra/validator/validator.js';
import type { Controller } from '@/shared/protocols/controller.js';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers.js';
import { HttpStatusCode } from '@/shared/protocols/http-client.js';
import type { Service } from '@/shared/protocols/service.js';

export class AccountController implements Controller {
  deleteAccountById: AsyncRequestHandler = async (req, res) => {
    const accountId = req.params.id;

    this.validator.validate(accountDeleteBySchema, {
      params: req.params,
    });

    await this.deleteByIdService.execute({ socialMediaId: accountId });

    res.status(HttpStatusCode.noContent).send();
  };

  constructor(
    private readonly validator: Validator,
    private readonly deleteByIdService: Service
  ) {}
}
