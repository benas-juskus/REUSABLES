import * as categoriesData from "./fakeData/categories.json";
import { PrismaClient } from "@prisma/client";
// import FakeCategories from "./fakeData/fakeCategories";

const prisma = new PrismaClient();

const categoriesSeed = async () => {
  try {
    for (const categoryData of categoriesData.Categories) {
      await prisma.categories.create({
        data: {
          title: categoryData.title,
          nr: categoryData.nr,
          SubCategories: {
            createMany: {
              data: categoryData.SubCategories,
            },
          },
        },
        include: {
          SubCategories: true,
        },
      });

      console.log(`Category ${categoryData.title} created`);
    }

    console.log("Categories & Subcategories created");

  } catch (error) {
    console.error("Error creating categories:", error);
  }

  
};

export default categoriesSeed;
