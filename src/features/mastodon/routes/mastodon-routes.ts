/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { MastodonService } from '@/features/mastodon/service/index';

const router = Router();

const { authenticate, authorize, status } = new MastodonService();

router.get('/authorize', authorize);
router.get('/status', status);
router.get('/authenticate', authenticate);

export default {
  prefix: 'mastodon',
  router,
};
