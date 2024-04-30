import { faker } from '@faker-js/faker';

export class UserMock {
  public static create() {
    return {
      email: faker.internet.email(),
      id: '00000000-0000-0000-0000-000000000000',
      name: faker.person.firstName(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    };
  }
}
