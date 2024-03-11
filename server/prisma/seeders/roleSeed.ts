import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();



const rolesSeed = async () => {
  const rolesExists = await  prisma.roles.findFirst({
        where: {
          id:1
        }
      })
      if (rolesExists) {
        console.log("Roles already exist.");
      } else {
        await prisma.roles.createMany({
          data: [
            {id:1, title: "user" },
            { id: 2, title: "admin" },
            { id: 3, title: "guest" }
          ]
        })
        console.log('Roles created')
      }
 
}
    
  

  export default rolesSeed;