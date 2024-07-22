import { database } from '@/shared/infra/database/database';

export class TokenRepository {
  upsert({
    accessToken,
    accountId,
    authToken,
    expiresIn,
  }: {
    accessToken: string;
    accountId: string;
    authToken: string;
    expiresIn: number;
  }) {
    return database.token.upsert({
      create: {
        authToken,
        expiresIn,
        issuedAt: new Date(),
        token: accessToken,
      },
      update: {
        expiresIn,
        token: accessToken,
      },
      where: {
        accountId,
      },
    });
  }
}
