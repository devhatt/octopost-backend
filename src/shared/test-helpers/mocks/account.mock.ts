import { faker } from '@faker-js/faker';

export class AccountMock {
  public static create() {
    return {
      avatarUrl: faker.image.avatar(),
      id: faker.string.numeric(),
      socialMediaId: faker.number.int(),
      userId: faker.string.numeric(),
    };
  }
}
