import { Router } from 'express';
import { accountControllerFactory } from '../controllers/account-controller-factory.js';

const router = Router();

const { accountController } = accountControllerFactory();

router.delete('/:id', accountController.deleteAccountById);

export default {
  prefix: 'accounts',
  router,
};
