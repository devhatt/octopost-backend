import { SocialMediaRepository } from '@/features/social-media/repositories/social-media';
import { ListSocialMediasService } from '@/features/social-media/services/list-social-medias';
import { SocialMediaMock } from '@/shared/test-helpers/mocks/social-media.mock';

describe('List Social Media', () => {
  let socialMediaRepository: SocialMediaRepository;
  let socialMediaService: ListSocialMediasService;
  let socialMediasMock: any;

  beforeEach(() => {
    socialMediaRepository = new SocialMediaRepository();
    socialMediaService = new ListSocialMediasService(socialMediaRepository);
    socialMediasMock = SocialMediaMock.List();
  });

  it('should return list of avaiable social medias', async () => {
    vi.spyOn(socialMediaRepository, 'list').mockResolvedValueOnce(
      socialMediasMock
    );

    const { socialMedias } = await socialMediaService.execute();

    expect(socialMedias).toBe(socialMediasMock);
  });
});
