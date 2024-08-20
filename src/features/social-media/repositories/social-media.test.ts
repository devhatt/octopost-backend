import { prisma } from 'mocks/prisma';

import { SocialMediaRepository } from '@/features/social-media/repositories/social-media';
import { SocialMediaMock } from '@/shared/test-helpers/mocks/social-media.mock';

const makeSut = () => {
  const repository = new SocialMediaRepository();
  const socialMedias = SocialMediaMock.List();
  return { repository, socialMedias };
};

describe('[Repositories] SocialMediaRepository', () => {
  describe('List', () => {
    it('should return a list of social medias', async () => {
      const { repository, socialMedias } = makeSut();

      prisma.socialMedia.findMany.mockResolvedValue(socialMedias);
      const result = await repository.list();
      expect(result).toBe(socialMedias);
    });
  });
});
