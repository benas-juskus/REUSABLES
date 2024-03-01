import { PrismaClient } from "@prisma/client";

import FakeUser from './fakeUser';
// import FakeItem from './fakeItem';
// import FakeCategory from './fakeCategory';
// import FakeSubCategory from './fakeSubCategory';

const prisma = new PrismaClient();

async function main() {
  const users = FakeUser.createMany(10);
  console.log(users);
}

// async function main() {
//   const user = FakeUser.create();
//   console.log(user);
//   // await prisma.users.createMany({
//   //   data: users.map(user => ({
//   //     id: user.id,
//   //     username: user.username,
//   //     email: user.email,
//   //     password: user.password,
//   //     createdAt: user.createdAt,
//   //     roleId: user.roleId,
//   //   })),
//   // });
// }

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

