/* istanbul ignore file -- @preserve */

import { Router } from 'express';
import { userControllerFactory } from './user-controller-factory.js';

const router = Router();

const { userController } = userControllerFactory();
router.get('/:id', userController.userFindById);
router.post('/', userController.create);

router.get('/:id/accounts', userController.getAccounts);

export default {
  prefix: 'users',
  router,
};
