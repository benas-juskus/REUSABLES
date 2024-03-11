import { PrismaClient } from "@prisma/client";
import FakeItems from "./fakeData/fakeItems";

const prisma = new PrismaClient();


const itemsSeed = async () => {

    const createdItems = [];
    const createdUsers = await prisma.users.findMany();
    const createdCategories = await prisma.categories.findMany();
    const createdSubCategories = await prisma.subCategories.findMany();

if (createdUsers && createdCategories && createdSubCategories) {
    
    for (const user of createdUsers) {
        for (let i = 0; i < 5; i++) {
          const randomCategory = createdCategories[Math.floor(Math.random() * createdCategories.length)];
          const subcategories = await prisma.subCategories.findMany({ where: { category_id: randomCategory.id } });
          const randomSubcategory = subcategories[Math.floor(Math.random() * subcategories.length)];
      
          const newItem = FakeItems.create(user.id, randomSubcategory.id);
          createdItems.push(newItem);
        }
      }
      
      await prisma.items.createMany({ data: createdItems });
      
      console.log("Items created successfully!");
    } else {
      console.log("No users, categories or subcategories found.");
    }      
}
 


    


export default itemsSeed
