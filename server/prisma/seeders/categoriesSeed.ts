import { PrismaClient } from "@prisma/client";
import FakeCategories from "./fakeData/fakeCategories";

const prisma = new PrismaClient();

const categoriesSeed = async () => {
    
    const categoryList = FakeCategories.createMany(5);
// console.log("Generated categories:", categoryList);
await prisma.categories.createMany({
  data: categoryList
});

console.log("Categories created");
}

 
export default categoriesSeed
