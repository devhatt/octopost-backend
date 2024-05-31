import { database } from '@/shared/infra/database/database.js';

export class SocialMediaRepository {
  async List() {
    const socialMedias = await database.socialMedia.findMany({
      select: {
        description: true,
        id: true,
        name: true,
      },
    });
    return socialMedias;
  }
}
