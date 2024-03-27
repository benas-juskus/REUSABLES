import { PrismaClient } from "@prisma/client";

// import FakeUser from './seeders/fakeData/fakeUser';
import rolesSeed from './seeders/roleSeed';
import userSeed from "./seeders/userSeed";
import categoriesSeed from './seeders/categoriesSeed'; 
import gallerySeed from './seeders/gallerySeed';
import itemsSeed from './seeders/itemSeed';
import locationsSeed from './seeders/locationsSeed';
import favouriteSeed from "./seeders/favouriteSeed";
import exchangeToSeed from "./seeders/exchangeToSeed";
import notificationsSeed from "./seeders/notificationsSeed";
import transactionsSeed from "./seeders/transactionsSeed";
import ratingsSeed from "./seeders/ratingsSeed";
import messagesSeed from "./seeders/messagesSeed";



const prisma = new PrismaClient();





async function main() {
  try {
    console.log("Seeding...");
    // const usersCreated = await prisma.users.findFirst();
    // const itemsCreated = await prisma.items.findFirst();
    // const notificationsCraeted = await prisma.notifications.findFirst();
    // if (usersCreated && itemsCreated && notificationsCraeted) {
    //   console.log("Seeding already done");
    //   return;
    // } else {
    //  await rolesSeed();
    //  await userSeed()
    //  await categoriesSeed()
    //  await gallerySeed()
    //  await itemsSeed()
    //  await locationsSeed()
    //  await favouriteSeed()
    //  await exchangeToSeed()
    //  await notificationsSeed()
     await transactionsSeed()
     await ratingsSeed()
     await messagesSeed()

    // }
  } catch (error) {
    console.error("Error:", error);
  } 
}

main().finally(async () => {
    await prisma.$disconnect();
  });

