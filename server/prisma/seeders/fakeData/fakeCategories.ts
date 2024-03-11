import { faker } from '@faker-js/faker';

interface Categories {
    // id: number;
    title: string;
    nr: number;
}

const FakeCategories = {
    create: function(): Categories {
        return {
            // id: faker.number.float({ min: 1, max: 15 }), 
            title: faker.commerce.department(),
            nr: faker.number.float()
        };
    },
    createMany: function(count: number): Categories[] {
        const categories: Categories[] = [];
        for (let i = 0; i < count; i++) {
            categories.push(this.create()); 
        }
        return categories;
    }
};

export default FakeCategories

