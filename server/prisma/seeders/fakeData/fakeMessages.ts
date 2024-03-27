import { faker} from '@faker-js/faker';

interface Messages {
    transaction_id: number;
    user_nr: number;
    message: string;
    seen: boolean;
    
}

const FakeMessages = {

    create: function(transaction_id: number, user_nr: number, seen: boolean): Messages {
        return {
            transaction_id: transaction_id,
            user_nr: user_nr,
            message: faker.lorem.sentence(),
            seen: seen
        }
    },
    createMany: function(count:number, transaction_id: number, user_nr: number, seen:boolean): Messages[]{
        const messages : Messages[] = [];
        for (let i=0; i< count; i++)
{
    messages.push(this.create(transaction_id, user_nr, seen));
}    
        return messages;
    }
};

export default FakeMessages;