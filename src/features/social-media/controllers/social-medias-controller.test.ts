import { mockDeep } from 'vitest-mock-extended';
import type { Request, Response } from 'express';
import { SocialMediasController } from './social-medias-controller';
import type { Service } from '@/shared/protocols/service';
import { HttpError } from '@/shared/errors/http-error';

const makeSut = () => {
  class ServiceFindAllStub implements Service {
    public execute(params: any): any {
      return params;
    }
  }

  const serviceFindAll = new ServiceFindAllStub();

  const socialMediasController = new SocialMediasController(serviceFindAll);

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
    serviceFindAll,
    socialMediasController,
  };
};

describe('[Controllers] SocialMediasController', () => {
  const { next, req, res, serviceFindAll, socialMediasController } = makeSut();
  it('should call service with correctly params', async () => {
    const serviceFindAllSpy = vi.spyOn(serviceFindAll, 'execute');

    await socialMediasController.findAll(req, res, next);

    expect(serviceFindAllSpy).toHaveBeenCalledWith({});
  });

  it('should response 200 with the list of availables social medias', async () => {
    const response = [
      { id: 1, name: 'Facebook' },
      { id: 2, name: 'Instagram' },
    ];

    vi.spyOn(serviceFindAll, 'execute').mockReturnValue(response);

    await socialMediasController.findAll(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(response);
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
