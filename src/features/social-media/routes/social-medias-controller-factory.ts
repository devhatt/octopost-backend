/* istanbul ignore file -- @preserve */

import { SocialMediasController } from '@/features/social-media/controllers/social-medias-controller.js';
import { ListSocialMediasService } from '@/features/social-media/services/list-social-medias.js';
import { SocialMediaRepository } from '@/features/social-media/repositories/social-media.js';

export function socialMediasControllerFactory() {
  const repository = new SocialMediaRepository();
  const serviceFindAll = new ListSocialMediasService(repository);
  const socialMediasController = new SocialMediasController(serviceFindAll);
  return { socialMediasController };
}
