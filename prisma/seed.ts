import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.socialMedia.createMany({
    data: [
      {
        description: '',
        name: 'Twitter',
      },
      {
        description: '',
        name: 'Instagram',
      },
      {
        description: '',
        name: 'Facebook',
      },
    ],
  });
}

main()
  .then(() => {
    console.log('Seed executed');
    prisma.$disconnect();
    process.exit(0);
  })
  .finally(() => {
    prisma.$disconnect();
  });
