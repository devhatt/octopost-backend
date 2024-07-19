import type { HttpAdapter } from '@/shared/infra/http/http-adapter';
import type { Logger } from '@/shared/infra/logger/logger';

type TwitterTokenResponse = {
  access_token: string;
  expires_in: 7200;
  scope: string;
  token_type: 'bearer';
};

export type TwitterUser = {
  id: string;
  name: string;
  username: string;
};

const clientId = process.env.TWITTER_CLIENT_ID!;

const basicAuth = Buffer.from(
  `${process.env.TWITTER_CLIENT_SECRET}:${clientId}`,
  'utf8'
).toString('base64');

const twitterOauthTokenParams = {
  client_id: clientId,
  code_verifier: 'gti48Qxg-ORDSTLlHs_QkOyNwOx8g5Be6A2FFh7iJDA',
  grant_type: 'authorization_code',
  redirect_uri: `http://www.localhost:3000/api/twitter/callback`,
};

export class TwitterService {
  constructor(
    private readonly logger: Logger,
    private readonly http: HttpAdapter
  ) {}

  async getTwitterOAuthToken(code: string) {
    try {
      const { data } = await this.http.post<TwitterTokenResponse>({
        config: {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
        data: {
          client_id: twitterOauthTokenParams.client_id,
          code,
          code_verifier: twitterOauthTokenParams.code_verifier,
          grant_type: twitterOauthTokenParams.grant_type,
          redirect_uri: twitterOauthTokenParams.redirect_uri,
        },
        url: '/2/oauth2/token',
      });

      return data;
    } catch (err) {
      this.logger.error(
        `Error on getTwitterOAuthToken in twitter service -${err}`
      );
      throw err;
    }
  }

  async getTwitterUser(accessToken: string) {
    try {
      const { data } = await this.http.get<{ data: TwitterUser }>({
        config: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
        url: '/2/users/me',
      });

      return data.data ?? null;
    } catch (err) {
      this.logger.error(`Error on getTwitterUser in twitter service -${err}`);
      throw err;
    }
  }
}
