import { MastodonAuthService } from '@/features/mastodon/services/v1/mastodon-auth-service';
import { MastodonController } from '@/features/mastodon/infra/http/controller/v1/mastodon-controller';
import { MastodonApi } from '@/features/mastodon/infra/api/mastodon-api';
import { AxiosHttpClient } from '@/shared/infra/http-client';

export function mastodonControllerFactory() {
  const axiosHttpClient = new AxiosHttpClient();

  const mastodonApi = new MastodonApi(axiosHttpClient);

  const mastodonServiceFindAll = new MastodonAuthService(mastodonApi);

  const mastodonController = new MastodonController(mastodonServiceFindAll);

  return { mastodonController };
}
