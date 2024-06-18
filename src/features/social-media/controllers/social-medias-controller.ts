import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { HttpStatusCode } from '@/shared/protocols/http-client';
import type { Service } from '@/shared/protocols/service';

export class SocialMediasController implements Controller {
  findAll: AsyncRequestHandler = async (_req, res, next) => {
    try {
      const response = await this.serviceFindAll.execute({});

      return res.status(HttpStatusCode.ok).json(response);
    } catch (error) {
      next(error);
    }
  };
  constructor(private serviceFindAll: Service<unknown>) {}
}
