import { faker } from '@faker-js/faker';

export class SocilMediaMock {
  private static socialMediaMock = {
    description: faker.lorem.text(),
    id: faker.number.int(),
    name: faker.person.firstName(),
  };

  public static List() {
    return [this.socialMediaMock];
  }
}
