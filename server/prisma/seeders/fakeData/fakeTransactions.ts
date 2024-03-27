import { faker} from '@faker-js/faker';

interface Transactions {
    user1_id: number;
    user2_id: number;
    item1_id: number;
    item2_id?: number | null;
    user1_conf:  boolean;
    user2_conf:  boolean;
    final_price: number;
    created_at: Date;
}

const FakeTransactions ={
    create : function ( user1_id: number, user2_id: number, item1_id: number, item2_id: number | null, final_price: number): Transactions {
        return {
            user1_id: user1_id,
            user2_id: user2_id,
            item1_id: item1_id,
            item2_id: item2_id,
            user1_conf: faker.datatype.boolean(),
            user2_conf: faker.datatype.boolean(),
            final_price: final_price,
            created_at: faker.date.past()
        }
    },

    createMany : function(count: number, user1_id: number, user2_id: number, item1_id: number, item2_id: number | null, final_price: number): Transactions[] {
        const transactions: Transactions[] = [];
        for (let i = 0; i < count; i++) {
            transactions.push(this.create(user1_id, user2_id, item1_id, item2_id, final_price));
        }
        return transactions;
    }
}

export default FakeTransactions
