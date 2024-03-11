import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const favouriteSeed = async () => {
    const users = await prisma.users.findMany();
    

    for (const user of users) {
        const favouritesExists = await prisma.favouriteItems.findMany({
            where: {
                user_id: user.id
            }
        });
        if (favouritesExists.length === 0) {
            const items = await prisma.items.findMany({ where: { users_id: user.id } });
        
          const randomItems = items.slice(0, 2);
            for (const item of randomItems) {
                await prisma.favouriteItems.create({
                    data: {
                        user_id: user.id,
                        items_id: item.id
                    }
                })
            }
    }}
    console.log("Favourites created");
}

export default favouriteSeed