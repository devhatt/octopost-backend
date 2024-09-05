import { PrismaClient } from '@prisma/client';

const client = new PrismaClient({
  log: ['info', 'warn', 'query', 'error'],
});

async function main() {
  console.log('FOI');
  const post = await client.user.create({
    data: {
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '001@Mypassword',
      username: 'johndoe123',
    },
  });

  console.log(post);
}

main();
