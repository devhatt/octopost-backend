import { Router } from 'express';

import { accountControllerFactory } from '@/features/account/routes/account-controller-factory';

const router = Router();

const { accountController } = accountControllerFactory();

router.delete('/:id', accountController.deleteAccountById);

export default {
  prefix: 'accounts',
  router,
};
