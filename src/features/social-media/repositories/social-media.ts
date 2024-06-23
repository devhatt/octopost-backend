import { database } from '@/shared/infra/database/database';

export class SocialMediaRepository {
  list() {
    return database.socialMedia.findMany({
      select: {
        description: true,
        id: true,
        name: true,
      },
    });
  }
}
