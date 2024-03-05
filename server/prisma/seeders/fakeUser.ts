import { faker } from '@faker-js/faker';
import * as bcrypt from "bcryptjs";

interface User {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    roleId: number;
}

const FakeUser = {
    password: bcrypt.hashSync("password", 10), 
    create: function(): User {
        return {
            roleId: faker.number.int({ min: 1, max: 3 }),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            createdAt: faker.date.past()
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

