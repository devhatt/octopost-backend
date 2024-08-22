/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { socialMediasControllerFactory } from '@/features/social-media/routes/social-medias-controller-factory';
import { authJwtFactory } from '@/middlewares/auth/auth-jwt-factory';

const router = Router();
const { authJwt } = authJwtFactory();

const { socialMediasController } = socialMediasControllerFactory();
router.use(authJwt.jwtAuth);
router.get('', socialMediasController.findAll);

export default {
  prefix: 'socialmedias',
  router,
};
