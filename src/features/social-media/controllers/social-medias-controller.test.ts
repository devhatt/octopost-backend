import type { Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import { SocialMediasController } from '@/features/social-media/controllers/social-medias-controller';
import { ListSocialMediasService } from '@/features/social-media/services/list-social-medias';
import { HttpError } from '@/shared/errors/http-error';
import { socialMediasRepositoryMock } from '@/shared/test-helpers/mocks/repositories/social-medias-repository.mock';

const makeSut = () => {
  const findAllServiceMock = mock<ListSocialMediasService>(
    new ListSocialMediasService(socialMediasRepositoryMock)
  );

  const socialMediasController = new SocialMediasController(findAllServiceMock);

  const req = mockDeep<Request>();
  const res = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;

  const next = vi.fn();

  return {
    next,
    req,
    res,
    serviceFindAll: findAllServiceMock,
    socialMediasController,
  };
};

describe('[Controllers] SocialMediasController', () => {
  const { next, req, res, serviceFindAll, socialMediasController } = makeSut();
  it('should call service with correctly params', async () => {
    const serviceFindAllSpy = vi.spyOn(serviceFindAll, 'execute');

    await socialMediasController.findAll(req, res, next);

    expect(serviceFindAllSpy).toHaveBeenCalled();
  });

  it('should response 200 with the list of availables social medias', async () => {
    const response = [
      { description: 'Face', id: 1, name: 'Facebook' },
      { description: 'Insta', id: 2, name: 'Instagram' },
    ];

    vi.spyOn(serviceFindAll, 'execute').mockResolvedValue({
      socialMedias: response,
    });

    await socialMediasController.findAll(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      socialMedias: response,
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should call next when an service error occurs', async () => {
    const error = new HttpError(500, 'error');

    vi.spyOn(serviceFindAll, 'execute').mockRejectedValueOnce(
      new HttpError(500, 'error')
    );

    await socialMediasController.findAll(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(error.toJSON()).toStrictEqual({ code: 500, message: 'error' });
  });
});
