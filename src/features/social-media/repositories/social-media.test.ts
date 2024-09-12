import { prisma } from 'mocks/prisma';

import { SocialMediaRepository } from '@/features/social-media/repositories/social-media';
import { SocialMediaMock } from '@/shared/test-helpers/mocks/social-media.mock';

describe('[Repositories] SocialMediaRepository', () => {
  let repository: SocialMediaRepository;
  let socialMedias: any;

  beforeEach(() => {
    repository = new SocialMediaRepository();
    socialMedias = SocialMediaMock.List();
  });

  describe('List', () => {
    it('should return a list of social medias', async () => {
      prisma.socialMedia.findMany.mockResolvedValue(socialMedias);
      const result = await repository.list();
      expect(result).toBe(socialMedias);
    });
  });
});
