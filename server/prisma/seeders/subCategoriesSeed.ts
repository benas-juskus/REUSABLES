import { PrismaClient } from "@prisma/client";
import FakeSubCategories from "./fakeData/fakeSubCategories";

const prisma = new PrismaClient();
const subCategoriesSeed = async () => {
    const categoriesList = await prisma.categories.findMany();
    if (categoriesList) {
        const numberOfSubcategories = 5;

        for (let i = 0; i < categoriesList.length; i++) {
            const category = categoriesList[i];
            const subcategoryList = FakeSubCategories.createMany(numberOfSubcategories, category.id); 
            await prisma.subCategories.createMany({ data: subcategoryList }); 
        }
        
        
              console.log("Subcategories created successfully.");

    } else {
        console.log("No categories found.");
    }
};

export default subCategoriesSeed
 
