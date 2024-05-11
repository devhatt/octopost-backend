import { faker } from '@faker-js/faker';
import type { User } from '@prisma/client';

export class UserMock {
  public static create() {
    return {
      email: faker.internet.email(),
      id: faker.string.numeric(),
      name: faker.person.firstName(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    };
  }
  public static findByID() {
    return {
      email: faker.internet.email(),
      id: faker.string.numeric(),
      name: faker.person.firstName(),
      username: faker.internet.userName(),
    } as User;
  }
}
