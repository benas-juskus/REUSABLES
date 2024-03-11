import { faker } from '@faker-js/faker';
import * as bcrypt from "bcryptjs";


interface Users {
    role_id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    
}

const FakeUser = {
    // password: bcrypt.hashSync("password", 10), 
    create: function(): Users {
        return {
            role_id: faker.number.int({ min: 1, max: 3 }),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync("password", 10),
            createdAt: faker.date.past()
        };
    },
    createMany: function(count: number): Users[] {
        const users: Users[] = [];
        for (let i = 0; i < count; i++) {
            users.push(this.create()); 
        }
        return users;
    }
};

export default FakeUser;

