import { PrismaClient } from "@prisma/client";
import FakeRatings from "./fakeData/fakeRatings";

const prisma = new PrismaClient();

const ratingsSeed = async () => {
    
    const transactions = await prisma.transactions.findMany();

    const ratingsList = [];

    for (const transaction of transactions) {
        const randomUser = await prisma.users.findFirst({
            take:1,
        });
        if (!randomUser) {
            continue;
        }
        const randomRate = Math.floor(Math.random() * 5) + 1;

        const newRating = FakeRatings.create(transaction.id, randomUser.id, transaction.user1_id, randomRate);
        ratingsList.push(newRating);
    
    }

    await prisma.ratings.createMany({
        data: ratingsList
    });

    console.log("Ratings created successfully.");
};

export default ratingsSeed;