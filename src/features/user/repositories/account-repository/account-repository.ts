import type { Prisma } from '@prisma/client';
import { database } from '@/shared/infra/database/database';

type CreateAccountParams = Prisma.Args<
  typeof database.account,
  'create'
>['data'];
export class AccountRepository {
  async create({ avatarUrl, socialMediaId, userId }: CreateAccountParams) {
    return await database.account.create({
      data: {
        avatarUrl,
        socialMediaId,
        userId,
      },
    });
  }

  async findAccountsByUserId(id: string) {
    const socialMidias = await database.account.findMany({
      where: {
        userId: id,
      },
    });
    return socialMidias;
  }
}
