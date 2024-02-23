import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    // const users = await prisma.users.findMany()
    // console.log(users);
    
    const user = await prisma.users.create({
      data: {
        username: 'kevin',
        email: 'kevin@mail.com',
        password: 'kevin123',
      }
    })
    console.log(user);
    
  }


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });