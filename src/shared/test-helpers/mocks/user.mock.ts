import { faker } from '@faker-js/faker';
import type { User } from '@prisma/client';

export class UserMock {
  public static create(override?: Partial<User>): User {
    return {
      createdAt: new Date(),
      deletedAt: null,
      email: faker.internet.email(),
      id: faker.string.numeric(),
      isActive: true,
      name: faker.person.firstName(),
      password: faker.internet.password(),
      updatedAt: new Date(),
      username: faker.internet.userName(),
      ...override,
    };
  }
}
