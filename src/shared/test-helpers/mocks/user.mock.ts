import { faker } from '@faker-js/faker';

export class UserMock {
  public static create() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
