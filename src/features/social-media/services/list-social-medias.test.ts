import { SocialMediaRepository } from '../repositories/social-media.js';
import { ListSocialMediasService } from './list-social-medias.js';
import { SocilMediaMock } from '@/shared/test-helpers/mocks/social-media.mock.js';

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

    vi.spyOn(socialMediaRepository, 'List').mockResolvedValueOnce(
      socialMediasMock
    );

    const list = await socialMediaService.execute();

    expect(list).toBe(socialMediasMock);
  });

  it('should throw when Repository throws', async () => {
    const { socialMediaRepository, socialMediaService } = makeSut();

    vi.spyOn(socialMediaRepository, 'List').mockImplementationOnce(async () => {
      throw new Error('error');
    });

    const response = socialMediaService.execute();
    await expect(response).rejects.toThrowError();
  });
});
