/* istanbul ignore file -- @preserve */
import { Router } from 'express';

import { authControllerFactory } from './auth-controller-factory.js';

const router = Router();

const { authController } = authControllerFactory();
router.post('/login', authController.login);
// router.get('/confirmation', authController.confirmation);

export default {
  prefix: 'auth',
  router,
};
