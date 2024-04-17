import type { HttpError } from '@/shared/errors/HttpError';
import {
  responseErrorFactory,
  responseOkFactory,
} from '@/shared/factories/responses';
import type { Controller } from '@/shared/protocols/controller';
import type { HttpRequest } from '@/shared/protocols/http';
import type { Service } from '@/shared/protocols/service';

export class MastodonController implements Controller {
  constructor(private mastodonServiceFindAll: Service<unknown>) {}

  findAll = async (httpRequest: HttpRequest) => {
    try {
      const response = await this.mastodonServiceFindAll.execute(httpRequest);
      return responseOkFactory(response);
    } catch (error) {
      return responseErrorFactory(error as HttpError);
    }
  };
}
