import { faker } from '@faker-js/faker';

export class UserMock {
  public static create() {
    return {
      email: faker.internet.email(),
      id: faker.number.int(),
      name: faker.person.firstName(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    };
  }
}
