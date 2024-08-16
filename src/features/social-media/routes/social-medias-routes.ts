/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { authJwtFactory } from '@/middlewares/auth/auth-jwt-factory';
import { socialMediasControllerFactory } from './social-medias-controller-factory';

const router = Router();
const { authJwt } = authJwtFactory();

const { socialMediasController } = socialMediasControllerFactory();
router.use(authJwt.jwtAuth);
router.get('', socialMediasController.findAll);

export default {
  prefix: 'socialmedias',
  router,
};
