import { PrismaClient } from "@prisma/client";
import FakeGallery from "./fakeData/fakeGallery";

const prisma = new PrismaClient();
const gallerySeed = async () => {
    const usersList = await prisma.users.findMany();
    if (usersList) {
        const numberOfPhotos = 3;

        for (let i = 0; i < usersList.length; i++) {
            const user = usersList[i];
            const galleryList = FakeGallery.createMany(numberOfPhotos, user.id); 
            await prisma.gallery.createMany({ data: galleryList }); 
        }
        
        
              console.log("Gallery created successfully.");

    } else {
        console.log("No users found.");
    }
};

export default gallerySeed
 
