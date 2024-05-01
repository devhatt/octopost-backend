import { faker } from '@faker-js/faker';

export class UserMock {
  public static create() {
    return {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    };
  }
}
