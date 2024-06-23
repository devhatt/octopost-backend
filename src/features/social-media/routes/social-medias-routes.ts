/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { socialMediasControllerFactory } from './social-medias-controller-factory';

const router = Router();

const { socialMediasController } = socialMediasControllerFactory();
router.get('', socialMediasController.findAll);

export default {
  prefix: 'socialmedias',
  router,
};
