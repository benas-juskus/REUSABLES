import { faker } from '@faker-js/faker';

interface Locations {
    user_id: number;
    longtitude: string;
    latitude: string;
}

const FakeLocations = {
    create: function(user_id: number): Locations {
        return {
            user_id: user_id,
            longtitude: faker.location.longitude().toString(),
            latitude: faker.location.latitude().toString()
        };
    },
    createMany: function(count: number, user_id: number): Locations[] {
        const locations: Locations[] = [];
        for (let i = 0; i < count; i++) {
            locations.push(this.create(user_id));
        }
        return locations;
    }
};

export default FakeLocations;