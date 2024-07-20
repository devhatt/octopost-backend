/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { authJwtFactory } from '@/middlewares/auth/auth-jwt-factory';

import { twitterControllerFactory } from './twitter-controller.factory';

const router = Router();

const { twitterController } = twitterControllerFactory();
const { authJwt } = authJwtFactory();

router.get('/login', twitterController.login);
router.get('/callback', twitterController.callback);

export default {
  prefix: 'twitter',
  router,
};
