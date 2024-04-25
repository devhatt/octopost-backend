/* istanbul ignore file */

import { Router } from 'express';
import { userControllerFactory } from './user-controller-factory';

const router = Router();

const { userController } = userControllerFactory();

router.get('/create', userController.create);

export default {
  router,
  prefix: 'user',
};
