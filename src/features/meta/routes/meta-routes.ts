/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { MetaAuthController } from '@/features/meta/controllers/meta-controller.js';

const router = Router();

router.get('/', new MetaAuthController().authenticate);
router.get('/callback', new MetaAuthController().callBack);

//http://localhost:3000/api/meta

export default {
  prefix: 'meta',
  router,
};
