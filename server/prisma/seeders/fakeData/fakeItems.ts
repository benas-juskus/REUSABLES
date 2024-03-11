

import { faker } from '@faker-js/faker';

interface Items {
    // id: number;
    users_id: number;
    subCategories_id: number;
    name: string;
    description: string;
    photo: string;
    price: number;
    for_sale: boolean;
    exchange: boolean;
    visibility: boolean;
    created_at: Date;
    updated_at: Date;
}

const FakeItems = {
    create: function( users_id: number, subCategoriesId: number): Items {
        return {
            // id: faker.number.int(),
            users_id: users_id,
            subCategories_id: subCategoriesId,
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            photo: faker.image.url(),
            price: faker.number.float({ min: 0, max: 1000 }),
            for_sale: faker.datatype.boolean(),
            exchange: faker.datatype.boolean(),
            visibility: faker.datatype.boolean(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent()
        };
    },
    createMany: function(count: number, users_id: number, subCategoriesId: number): Items[] {
        const items: Items[] = [];
        for (let i = 0; i < count; i++) {
            items.push(this.create(users_id,subCategoriesId)); 
        }
        return items;
    }
};

export default FakeItems;
