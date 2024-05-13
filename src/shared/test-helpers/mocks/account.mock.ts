import { faker } from '@faker-js/faker';

type Account = {
  avatarUrl: string;
  id: string;
  socialMediaId: number;
  userId: string;
};

export class AccountMock {
  public static create(override?: Partial<Account>) {
    return {
      avatarUrl: faker.image.avatar(),
      id: faker.string.numeric(),
      socialMediaId: faker.number.int(),
      userId: faker.string.numeric(),
      ...override,
    };
  }
}
