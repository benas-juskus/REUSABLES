import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    
    console.log("Seeding...");
    const user = await prisma.users.create({
        data: {
          username: 'kevin',
          email: 'kevin@mail.com',
          password: 'kevin123',
        }
      });
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})

