import { faker } from '@faker-js/faker';


export async function createItem () {
    return {
      title: faker.random.alpha(10),
      url: faker.internet.url(),
      description: faker.random.alpha(20),
      amount: 50
    };
  } 