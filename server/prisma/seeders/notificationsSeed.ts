import { PrismaClient } from "@prisma/client";
import FakeNotifications from "./fakeData/fakeNotifications";

const prisma = new PrismaClient();

async function notificationsSeed() {
    const users = await prisma.users.findMany();
    const items = await prisma.items.findMany();
if (users && items) {
    

    const notifPerUser = 5;
    const createdNotifications = [];

    for (const user of users) {
        for (let i =0; i < notifPerUser; i++) {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            const newNotification = FakeNotifications.create(user.id, randomItem.id);
            createdNotifications.push(newNotification);
        }
    }
    await prisma.notifications.createMany({
        data: createdNotifications
    })

    console.log("Notifications created successfully!");
} else {
    console.log("No users or items found!");
}
}

export default notificationsSeed