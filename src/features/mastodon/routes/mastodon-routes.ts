/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { MastodonService } from '../service';

const router = Router();

const { authenticate, authorize, status } = new MastodonService();

router.get('/authorize', authorize);
router.get('/status', status);
router.get('/authenticate', authenticate);

export default {
  prefix: 'mastodon',
  router,
};
