import type {
  MastodonAuthRequestBody,
  MastodonAuthRequestResponse,
} from '@octopost/types';

import type { MastodonApi } from '@/features/mastodon/infra/api/mastodon-api';
import type { HttpRequest } from '@/shared/protocols/http';
import type { ServiceRedirect } from '@/shared/protocols/service';
import env from '@/config/env';

export class MastodonAuthService implements ServiceRedirect {
  constructor(private mastodonApi: MastodonApi) {}

  execute(
    httpRequest: HttpRequest<object, object, MastodonAuthRequestBody>
  ): Promise<MastodonAuthRequestResponse> {
    const body = httpRequest.body!;

    body.instance = 'https://mastodon.social';

    const authorizationUrl = this.mastodonApi.getAuthorizationURL({
      instance: body.instance,
      clientId: env.OAUTH_MASTODON_CLIENT_ID,
      responseType: 'code',
      scopes: ['read', 'write'],
    });

    return Promise.resolve(authorizationUrl);
  }
}
