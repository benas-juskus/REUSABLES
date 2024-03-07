const { PrismaClient } = require('@prisma/client');

interface User {
    id?: number;
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
    showOne: async ( userdata: User) => {
        
        const user = await prisma.users.findFirst({
            where: {
                OR:[
                    { username: userdata.username },
                    { email: userdata.email },
                    { id: userdata.id }
                ]
            },
            include: { Role: { select: { title: true }}}
        })
        return user
    },
    showAll: async () => {
        const users = await prisma.users.findMany({
            include: { Role: { select: { title: true }}}
        })
        return users
    },
    update: async (user_id: Number, userdata: User) => {
        const uppdatedUser = await prisma.users.update({
            where: {
                id: Number(user_id)
            },
            data: {
                username: userdata.username,
                email: userdata.email,
                role_id: userdata.role_id,
            }
        })
    }
    
}

module.exports = User 
