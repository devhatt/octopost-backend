import { SocilMediaMock } from '@/shared/test-helpers/mocks/social-media.mock';

import { SocialMediaRepository } from '../repositories/social-media';
import { ListSocialMediasService } from './list-social-medias';

const makeSut = () => {
  const socialMediaRepository = new SocialMediaRepository();
  const socialMediaService = new ListSocialMediasService(socialMediaRepository);
  const socialMediasMock = SocilMediaMock.List();
  return { socialMediaRepository, socialMediaService, socialMediasMock };
};

describe('UserCreateService', () => {
  it('should return list of avaiable social medias', async () => {
    const { socialMediaRepository, socialMediaService, socialMediasMock } =
      makeSut();

    vi.spyOn(socialMediaRepository, 'list').mockResolvedValueOnce(
      socialMediasMock
    );

    const list = await socialMediaService.execute();

    expect(list).toBe(socialMediasMock);
  });

  it('should throw when Repository throws', async () => {
    const { socialMediaRepository, socialMediaService } = makeSut();

    vi.spyOn(socialMediaRepository, 'list').mockImplementationOnce(async () => {
      throw new Error('error');
    });

    const response = socialMediaService.execute();
    await expect(response).rejects.toThrowError();
  });
});
