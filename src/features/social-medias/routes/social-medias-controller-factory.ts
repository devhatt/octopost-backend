/* istanbul ignore file -- @preserve */

import { SocialMediasController } from '../controllers/social-medias-controller.js';
import type { Service } from '@/shared/protocols/service.js';

export function socialMediasControllerFactory() {
  const serviceFindAll = {} as Service;
  const socialMediasController = new SocialMediasController(serviceFindAll);
  return { socialMediasController };
}
