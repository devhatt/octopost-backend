import { faker } from '@faker-js/faker';

type Account = {
  avatarUrl: null | string;
  createdAt: Date;
  favorite: boolean;
  id: string;
  name: null | string;
  socialMediaId: number;
  socialMediaUserId: null | string;
  updatedAt: Date;
  userId: null | string;
  username: null | string;
};

export class AccountMock {
  public static create(override?: Partial<Account>) {
    return {
      avatarUrl: faker.image.avatar(),
      createdAt: faker.date.past(),
      favorite: faker.datatype.boolean(),
      id: faker.string.numeric(),
      name: faker.person.firstName(),
      socialMediaId: faker.number.int(),
      socialMediaUserId: faker.string.uuid(),
      updatedAt: faker.date.recent(),
      userId: faker.string.numeric(),
      username: faker.internet.userName(),
      ...override,
    };
  }
}
