import { database } from '@/shared/infra/database/database';

export class SocialMediaRepository {
  async list() {
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
