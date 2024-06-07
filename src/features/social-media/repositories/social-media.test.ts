import { SocialMediaRepository } from './social-media.js';
import { prisma } from 'mocks/prisma.js';
import { SocilMediaMock } from '@/shared/test-helpers/mocks/social-media.mock.js';

const makeSut = () => {
  const repository = new SocialMediaRepository();
  const socialMedias = SocilMediaMock.List();
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
  it('should throw an error if an error occurs', async () => {
    const { repository } = makeSut();

    prisma.socialMedia.findMany.mockImplementationOnce(() => {
      throw new Error('error');
    });

    const response = repository.list();
    await expect(response).rejects.toThrowError();
  });
});
