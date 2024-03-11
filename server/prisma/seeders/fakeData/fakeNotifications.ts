import { faker} from '@faker-js/faker';

interface Notifications {
    user_id: number;
    item_id: number;
    data: string;
    seen: boolean;
    created_at: Date;
}

const FakeNotifications = {
    create: function(user_id: number, item_id: number): Notifications {
        return {
            user_id: user_id,
            item_id: item_id,
            data: faker.lorem.sentence(),
            seen: faker.datatype.boolean(),
            created_at: faker.date.past()
        };
    },
    createMany: function(count: number, user_id: number, item_id: number): Notifications[] {
        const notifications: Notifications[] = [];
        for (let i=0; i < count; i++) {
            notifications.push(this.create(user_id, item_id));
        }
        return notifications;
    }
};

export default FakeNotifications;