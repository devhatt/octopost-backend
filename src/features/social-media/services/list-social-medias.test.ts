import { SocialMediaMock } from '@/shared/test-helpers/mocks/social-media.mock';

import { SocialMediaRepository } from '../repositories/social-media';
import { ListSocialMediasService } from './list-social-medias';

const makeSut = () => {
  const socialMediaRepository = new SocialMediaRepository();
  const socialMediaService = new ListSocialMediasService(socialMediaRepository);
  const socialMediasMock = SocialMediaMock.List();
  return { socialMediaRepository, socialMediaService, socialMediasMock };
};

describe('List Social Media', () => {
  it('should return list of avaiable social medias', async () => {
    const { socialMediaRepository, socialMediaService, socialMediasMock } =
      makeSut();

    vi.spyOn(socialMediaRepository, 'list').mockResolvedValueOnce(
      socialMediasMock
    );

    const { socialMedias } = await socialMediaService.execute();

    expect(socialMedias).toBe(socialMediasMock);
  });
});
