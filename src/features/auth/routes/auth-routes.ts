/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { authControllerFactory } from '@/features/auth/routes/auth-controller-factory';

const router = Router();

const { authController } = authControllerFactory();
router.post('/login', authController.login);
// router.get('/confirmation', authController.confirmation);

export default {
  prefix: 'auth',
  router,
};
