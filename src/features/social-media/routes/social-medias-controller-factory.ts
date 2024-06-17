import { SocialMediasController } from '@/features/social-media/controllers/social-medias-controller';
import { ListSocialMediasService } from '@/features/social-media/services/list-social-medias';
import { SocialMediaRepository } from '@/features/social-media/repositories/social-media';

export function socialMediasControllerFactory() {
  const repository = new SocialMediaRepository();
  const serviceFindAll = new ListSocialMediasService(repository);
  const socialMediasController = new SocialMediasController(serviceFindAll);
  return { socialMediasController };
}
