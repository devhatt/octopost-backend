/* istanbul ignore file -- @preserve */

import { Router } from 'express';
import { userControllerFactory } from './user-controller-factory.js';

const router = Router();

const { userController } = userControllerFactory();
router.post('/', userController.create);

export default {
  prefix: 'users',
  router,
};
