"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var bcrypt = require("bcryptjs");
var FakeUser = {
    password: bcrypt.hashSync("password", 10),
    create: function () {
        return {
            id: faker_1.faker.number.int(),
            roleId: faker_1.faker.number.int(),
            username: faker_1.faker.internet.userName(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
            createdAt: faker_1.faker.date.past(),
            favouriteItems: [],
            items: [],
            locations: [],
            notifications: [],
            // roleId: faker.number.int(),
            tokens: []
        };
    },
    createMany: function (count) {
        var users = [];
        for (var i = 0; i < count; i++) {
            users.push(this.create());
        }
        return users;
    }
};
exports.default = FakeUser;
