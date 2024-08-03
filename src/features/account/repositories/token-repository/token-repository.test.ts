import { faker } from '@faker-js/faker/locale/pt_BR';
import { prisma } from 'mocks/prisma';

import { TokenRepository } from './token-repository';

describe('[Repositories] TokenRepository', () => {
  let sut: TokenRepository;

  beforeEach(() => {
    sut = new TokenRepository();
  });

  it('upsert', async () => {
    const input = {
      accessToken: faker.string.alpha(),
      accountId: faker.string.alpha(),
      authToken: faker.string.alpha(),
      expiresIn: faker.number.int({ max: 100 }),
    };

    const expected = {
      accountId: faker.string.alpha(),
      authToken: faker.string.alpha(),
      expiresIn: faker.number.int({ max: 100 }),
      id: faker.number.int({ max: 100 }),
      issuedAt: new Date(),
      token: faker.string.alpha(),
    };

    prisma.token.upsert.mockResolvedValue(expected);

    const result = await sut.upsert(input);

    expect(result).toEqual(expected);
    expect(prisma.token.upsert).toHaveBeenCalledWith({
      create: {
        authToken: input.authToken,
        expiresIn: input.expiresIn,
        issuedAt: expect.any(Date),
        token: input.accessToken,
      },
      update: {
        expiresIn: input.expiresIn,
        token: input.accessToken,
      },
      where: {
        accountId: input.accountId,
      },
    });
  });
});
