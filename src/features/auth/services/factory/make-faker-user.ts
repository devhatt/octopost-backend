import { faker } from '@faker-js/faker';
import type { User } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { randomUUID } from 'node:crypto';

export function makeUserMock(override?: Partial<User>) {
  const user = {
    address: faker.location.city(),
    createdAt: new Date(),
    deletedAt: null,
    email: faker.internet.email(),
    id: override?.id ?? randomUUID(),
    name: faker.person.fullName(),
    password: hashSync(override?.password ?? faker.internet.password(), 6),
    updatedAt: new Date(),
    username: faker.person.fullName(),
    ...override,
  };

  return user;
}
