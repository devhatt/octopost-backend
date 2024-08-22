import type { ListSocialMediasService } from '@/features/social-media/services/list-social-medias';
import type { Controller } from '@/shared/protocols/controller';
import type { AsyncRequestHandler } from '@/shared/protocols/handlers';
import { HttpStatusCode } from '@/shared/protocols/http-client';

export class SocialMediasController implements Controller {
  findAll: AsyncRequestHandler = async (_, res, next) => {
    try {
      const { socialMedias } = await this.serviceFindAll.execute();

      return res.status(HttpStatusCode.ok).json({ socialMedias });
    } catch (error) {
      next(error);
    }
  };
  constructor(private serviceFindAll: ListSocialMediasService) {}
}
