/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { MastodonService } from '../service';

const router = Router();

const { authenticate, callback, createApp } = new MastodonService();

router.post('/', authenticate);
router.post('/callback', callback);
router.post('/app', createApp);

export default {
  prefix: 'mastodon',
  router,
};
