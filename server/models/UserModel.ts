// import { PrismaClient } from '@prisma/client';
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
        console.log("userdata", userdata);
        const user = await prisma.users.create({
            data: {
                username: userdata.username,
                email: userdata.email,
                password: userdata.password,
                role_id: userdata.role_id
            }
        })
    },
    showUser: async (userdata: User) => {
        const user = await prisma.users.findUnique({
            data: {
                email: userdata.email
            }
        })
    }
    
}

module.exports = User 
