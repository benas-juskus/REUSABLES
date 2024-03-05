import { PrismaClient } from "@prisma/client";

import FakeUser from './seeders/fakeUser';
import roles from './seeders/roles';
// import FakeItem from './fakeItem';
// import FakeCategory from './fakeCategory';
// import FakeSubCategory from './fakeSubCategory';

const prisma = new PrismaClient();

async function main() {
  prisma.role.createMany({
    data: roles
  })
  .then(create_roles => {
    if (create_roles) {
      const users_list = FakeUser.createMany(10);
      console.log(users_list);
      prisma.users.createMany({
        data: users_list
      })
      .then(create_users => {
        console.log(create_users);
      })
      .catch(error => {
        console.error(error);
      });
    }
  })
  .catch(error => {
    console.error(error);
  });
}

main().finally(async () => {
    await prisma.$disconnect();
  });

