import type { Controller } from '@/shared/protocols/controller.js';
import type { Service } from '@/shared/protocols/service.js';
import { HttpStatusCode } from '@/shared/protocols/http-client.js';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers.js';

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
