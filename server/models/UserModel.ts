const { PrismaClient } = require('@prisma/client');

interface User {
    username?: string;
    email?: string;
    password?: string;
    role_id?: number;
}
const prisma = new PrismaClient();

const User = {

    create: async (userdata: User) => {
        // console.log("userdata", userdata);
        const user = await prisma.users.create({
            data: {
                username: userdata.username,
                email: userdata.email,
                password: userdata.password,
                role_id: userdata.role_id
            }
        })
    },
    showOne: async (userdata: User) => {
        const user = await prisma.users.findFirst({
            where: {
                OR:[
                    { username: userdata.username },
                    { email: userdata.email }
                ]
            }
        })
        return user
    },
    showAll: async () => {
        const users = await prisma.users.findMany()
        return users
    }
    
}

module.exports = User 
