import type { UpsertParams } from '@/features/account/models/account-model';
import { database } from '@/shared/infra/database/database';

export class TokenRepository {
  upsert({ accessToken, accountId, authToken, expiresIn }: UpsertParams) {
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
