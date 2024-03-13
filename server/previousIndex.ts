import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function main() {
  const prisma = new PrismaClient();
  
  try {
    await prisma.$connect(); // Connect to the database
    console.log('Prisma client connected successfully.');

    // Perform database operation to create a user
    const user = await prisma.users.create({
      data: {
        username: 'kevin',
        email: 'kevin@mail.com',
        password: 'kevin123',
      }
    });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error during Prisma client initialization:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}

main().catch(error => {
  console.error('Error in main function:', error);
  process.exit(1);
});

// const port = process.env.APP_PORT || 8000

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`)
// })