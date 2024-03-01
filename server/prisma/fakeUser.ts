import { faker } from '@faker-js/faker';
import * as bcrypt from "bcryptjs";

interface User {
    id: any;
    // role_id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    favouriteItems: any[]; 
    items: any[]; 
    locations: any[]; 
    notifications: any[]; 
    roleId: number;
    tokens: any[]; 
}

const FakeUser = {
    password: bcrypt.hashSync("password", 10), 
    create: function(): User {
        return {
            id: faker.number.int(),
            roleId: faker.number.int(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            createdAt: faker.date.past(),
            favouriteItems: [], 
            items: [], 
            locations: [], 
            notifications: [], 
            // roleId: faker.number.int(),
            tokens: [] 
        };
    },
    createMany: function(count: number): User[] {
        const users: User[] = [];
        for (let i = 0; i < count; i++) {
            users.push(this.create()); 
        }
        return users;
    }
};

export default FakeUser;

