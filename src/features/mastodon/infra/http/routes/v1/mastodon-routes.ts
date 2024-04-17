import { Router } from 'express';
import { mastodonControllerFactory } from './mastodon-controller-factory';
import { redirectRouteAdapter } from '@/shared/adapters/redirect-router-adapter';

const router = Router();

const { mastodonController } = mastodonControllerFactory();

router.get('/authorize', redirectRouteAdapter(mastodonController.findAll));

router.get(
  '/callback',
  redirectRouteAdapter((payload) =>
    Promise.resolve({ body: payload, statusCode: 301 })
  )
);

export default {
  router,
  prefix: 'mastodon',
};
