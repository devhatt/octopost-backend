import { database } from '@/shared/infra/database/database.js';

export class AccountRepository {
  async findAccountsByUserId(id: string) {
    const socialMidias = await database.user.findMany({
      select: {
        account: true,

        name: true,
      },
      where: {
        id,
      },
    });

    console.log(socialMidias);
    return socialMidias;
  }
}
