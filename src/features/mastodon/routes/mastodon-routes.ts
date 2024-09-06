/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { MastodonService } from '../service';

const router = Router();

const { authenticate, authorize, hello } = new MastodonService();

router.get('/authorize', authorize);
router.get('/hello', hello);
router.get('/callback', authenticate);

export default {
  prefix: 'mastodon',
  router,
};
