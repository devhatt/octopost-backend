import { Router } from 'express';
import { authControllerFactory } from './auth-controller-factory.js';

const router = Router();

const { authController } = authControllerFactory();
router.post('/login', authController.login);

export default {
  prefix: 'auth',
  router,
};
