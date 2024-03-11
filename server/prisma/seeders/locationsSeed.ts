import { PrismaClient } from "@prisma/client";
import FakeLocations from "./fakeData/fakeLocations";

const prisma = new PrismaClient();

const locationsSeed = async () => {
    // const location = await prisma.locations.findFirst();
    // if (location) {
    //     console.log("Locations already exist");
    //     return
    // } else {
    //     console.log("Creating locations...");
    // }
    const users = await prisma.users.findMany();
    for (const user of users) {
        const locationsExists = await prisma.locations.findMany({
            where: {
                user_id: user.id
            }
        });

        if (locationsExists.length ===0) {
            const locationData = FakeLocations.create(user.id);
            await prisma.locations.create({
                data: locationData
            });
        }
    }
    // const locationList = users.map(user => {
    //     return FakeLocations.create(user.id);
    // })

    // await prisma.locations.createMany({
    //     data: locationList
    // })
    console.log("Locations created");
}

export default locationsSeed;