import type { NextFunction, Request, Response } from 'express';
import { mock, mockDeep } from 'vitest-mock-extended';

import { SocialMediasController } from '@/features/social-media/controllers/social-medias-controller';
import { ListSocialMediasService } from '@/features/social-media/services/list-social-medias';
import { HttpError } from '@/shared/errors/http-error';
import { HttpStatusCode } from '@/shared/protocols/http-client';
import { socialMediasRepositoryMock } from '@/shared/test-helpers/mocks/repositories/social-medias-repository.mock';

describe('[Controllers] SocialMediasController', () => {
  let findAllServiceMock: ListSocialMediasService;
  let socialMediasController: SocialMediasController;
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let error: HttpError;

  beforeEach(() => {
    findAllServiceMock = mock<ListSocialMediasService>(
      new ListSocialMediasService(socialMediasRepositoryMock)
    );

    socialMediasController = new SocialMediasController(findAllServiceMock);

    req = mockDeep<Request>();

    res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    next = vi.fn() as unknown as NextFunction;

    error = new HttpError(HttpStatusCode.serverError, 'error');
  });

  it('should call service with correctly params', async () => {
    const serviceFindAllSpy = vi.spyOn(findAllServiceMock, 'execute');

    await socialMediasController.findAll(req, res, next);

    expect(serviceFindAllSpy).toHaveBeenCalled();
  });

  it('should response 200 with the list of availables social medias', async () => {
    const response = [
      { description: 'Face', id: 1, name: 'Facebook' },
      { description: 'Insta', id: 2, name: 'Instagram' },
    ];

    vi.spyOn(findAllServiceMock, 'execute').mockResolvedValue({
      socialMedias: response,
    });

    await socialMediasController.findAll(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      socialMedias: response,
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should call next when an service error occurs', async () => {
    vi.spyOn(findAllServiceMock, 'execute').mockRejectedValueOnce(error);

    await socialMediasController.findAll(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(error.toJSON()).toStrictEqual({ code: 500, message: 'error' });
  });
});
