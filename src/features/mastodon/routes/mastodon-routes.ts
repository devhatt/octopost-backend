/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { MastodonService } from '../service';

const router = Router();

const { authenticate, authorize, status } = new MastodonService();

router.get('/authorize', authorize);
router.get('/hello', status);
router.get('/callback', authenticate);

export default {
  prefix: 'mastodon',
  router,
};
