import { PrismaClient } from "@prisma/client";

// import FakeUser from './seeders/fakeData/fakeUser';
import rolesSeed from './seeders/roleSeed';
import userSeed from "./seeders/userSeed";
import categoriesSeed from './seeders/categoriesSeed'; 
import subCategoriesSeed from './seeders/subCategoriesSeed';
import itemsSeed from './seeders/itemSeed';
import locationsSeed from './seeders/locationsSeed';
import favouriteSeed from "./seeders/favouriteSeed";
import exchangeToSeed from "./seeders/exchangeToSeed";
import notificationsSeed from "./seeders/notificationsSeed";



const prisma = new PrismaClient();



// async function main() {
//  await Roles()
  
//   .then( () => {
    
//       const users_list = FakeUser.createMany(10);
//       console.log(users_list);
//       prisma.users.createMany({
//         data: users_list
//       })
//       .then(create_users => {
//         console.log(create_users);

//         const category_list = FakeCategories.createMany(5);
//         prisma.categories.createMany({
//           data: category_list
//         })
//         .then(create_categories => {
//           console.log(create_categories);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//       })
//       .catch(error => {
//         console.error(error);
//       });
//     }
//   )
//   .catch(error => {
//     console.error(error);
//   });
// }


async function main() {
  try {
    console.log("Seeding...");
    // const usersCreated = await prisma.users.findMany({
    //   take:5
    // });
    // const itemsCreated = await prisma.items.findMany({
    //   take:5
    // });
    // const notificationsCraeted = await prisma.notifications.findMany({
    //   take:5
    // });
    // if (usersCreated && itemsCreated && notificationsCraeted) {
    //   console.log("Seeding already done");
    //   return;
    // } else {
     await rolesSeed();
     await userSeed()
     await categoriesSeed()
     await subCategoriesSeed()
     await itemsSeed()
     await locationsSeed()
     await favouriteSeed()
     await exchangeToSeed()
     await notificationsSeed()

    // }
  } catch (error) {
    console.error("Error:", error);
  } 
}

main().finally(async () => {
    await prisma.$disconnect();
  });

