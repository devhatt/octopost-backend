/* istanbul ignore file -- @preserve */
import { SocialMediasController } from '@/features/social-media/controllers/social-medias-controller';
import { SocialMediaRepository } from '@/features/social-media/repositories/social-media';
import { ListSocialMediasService } from '@/features/social-media/services/list-social-medias';

export function socialMediasControllerFactory() {
  const repository = new SocialMediaRepository();
  const serviceFindAll = new ListSocialMediasService(repository);
  const socialMediasController = new SocialMediasController(serviceFindAll);
  return { socialMediasController };
}
