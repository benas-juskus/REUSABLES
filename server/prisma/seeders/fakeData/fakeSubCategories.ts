import { faker } from '@faker-js/faker';

interface SubCategories {
    // id: number;
    category_id: number;
    title: string;
    nr: number;
}

const FakeSubCategories = {
    create: function(categoryId: number): SubCategories {
        return {
            // id: faker.number.float({ min: 1, max: 255}), 
            category_id: categoryId,
            title: faker.commerce.productAdjective(),
            nr: faker.number.float()
        };
    },
    createMany: function(count: number, categoryId: number): SubCategories[] {
        const subCategories: SubCategories[] = [];
        for (let i = 0; i < count; i++) {
            subCategories.push(this.create(categoryId)); 
        }
        return subCategories;
    }
};

export default FakeSubCategories