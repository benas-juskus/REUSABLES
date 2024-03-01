import { PrismaClient } from "@prisma/client";

import FakeUser from './fakeUser';
// import FakeItem from './fakeItem';
// import FakeCategory from './fakeCategory';
// import FakeSubCategory from './fakeSubCategory';

const prisma = new PrismaClient();

// async function main() {
//   const users = FakeUser.createMany(10);
//   console.log(users);
// }

async function main() {

  try {
    const create_roles = await prisma.role.createMany({
      data: [
        {title: "user"},
        {title: "admin"},
        {title: "moderator"}
      ]
    });
    if (create_roles) {
      try {
        const users_list = FakeUser.createMany(10);
        console.log(users_list);
        const create_users = await prisma.users.createMany({
          data: users_list
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  catch (error) {
    console.log(error);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

