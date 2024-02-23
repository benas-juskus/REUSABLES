import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany()
    console.log(users)
  }
// async function add(){
//   const user = await prisma.user.create({
//     data: {
//       username: 'test',
//       email: "test@mail.com",
//       password: "123"
//     }
//   })
// }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });