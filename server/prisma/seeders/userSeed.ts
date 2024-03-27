import { PrismaClient } from "@prisma/client";
import FakeUser from "./fakeData/fakeUser";

const prisma = new PrismaClient();
const userSeed = async () => {
    const usersList = FakeUser.createMany(15);
    //   console.log("Generated users:", usersList);

      const createdUsers = await prisma.users.createMany({
        data: usersList
      });

      console.log("Users created");
}


export default userSeed