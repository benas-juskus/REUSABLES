// import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const User = {

    create: async (userdata) => {
        console.log("userdata", userdata);
        const user = await prisma.users.create({
            data: {
                username: userdata.username,
                email: userdata.email,
                password: userdata.password,
                // role: {connect: {id: userdata.role_id}}, 
                roleId: userdata.role_id
            }
        })
    },
    
}

module.exports = User 
