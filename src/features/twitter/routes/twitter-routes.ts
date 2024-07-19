/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { twitterControllerFactory } from './twitter-controller.factory';

const router = Router();

const { twitterController } = twitterControllerFactory();
router.get('/authorize', twitterController.authorize);
router.get('/callback', twitterController.callback);

export default {
  prefix: 'twitter',
  router,
};
