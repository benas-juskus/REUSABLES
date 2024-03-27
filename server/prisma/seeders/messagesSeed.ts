import {  PrismaClient } from "@prisma/client";
import FakeMessages from "./fakeData/fakeMessages";

const prisma = new PrismaClient();

const messagesSeed = async () => {
    const users = await prisma.users.findMany({
        take: 10,
    });
    const transactions = await prisma.transactions.findMany();
    const messagesList = [];

    for (const transaction of transactions) {
        const messageCount = Math.floor(Math.random() * 10) + 1;

        for (let i = 0; i < messageCount; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomMessage = FakeMessages.create(transaction.id, randomUser.id,  false);
            messagesList.push(randomMessage);
    }
    
   
    }
    await prisma.messages.createMany({ data: messagesList });
    console.log("Messages created successfully.");
};

export default messagesSeed;
