import type { HttpClient } from '@/shared/protocols/http-client';

interface GetAuthorizationURLParams {
  responseType: string;
  clientId: string;
  redirectUri?: string;
  instance: string;
  scopes: string[];
}

interface GetTokenParams {
  grantType: string;
  code: string;
  clientId: string;
  redirectUri?: string;
  instance: string;
  scopes: string[];
}

interface GetTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  created_at: number;
}

export class MastodonApi {
  private readonly scopes: string[] = ['read', 'write'];

  constructor(private readonly httpClient: HttpClient) {}

  getAuthorizationURL = ({
    responseType,
    clientId,
    instance,
    redirectUri = 'urn:ietf:wg:oauth:2.0:oob',
    scopes = this.scopes,
  }: GetAuthorizationURLParams) => {
    const url = new URL('/oauth/authorize', instance);
    const searchParams = url.searchParams;

    searchParams.append('client_id', clientId);
    searchParams.append('redirect_uri', redirectUri);
    searchParams.append('response_type', responseType);
    searchParams.append('scope', scopes.join('+'));

    return url.href;
  };

  getToken = async ({
    grantType,
    code,
    clientId,
    redirectUri = 'urn:ietf:wg:oauth:2.0:oob',
    instance,
    scopes = this.scopes,
  }: GetTokenParams) => {
    const form = new FormData();
    const url = new URL('/oauth/token', instance);

    form.append('grant_type', grantType);
    form.append('code', code);
    form.append('client_id', clientId);
    form.append('redirect_uri', redirectUri);
    form.append('scope', scopes.join(','));

    const response = await this.httpClient.request<GetTokenResponse>({
      method: 'post',
      body: form,
      url: url.href,
    });

    return response;
  };
}
