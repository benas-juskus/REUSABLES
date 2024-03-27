import { faker } from '@faker-js/faker';

interface Ratings {
    transaction_id: number;
    user_id: number;
    rater_id: number;
   rate: number;
   comment?: string;
   
}
const FakeRatings = {
    create: function(transaction_id: number, user_id: number, rater_id: number, rate: number, comment?: string): Ratings{
  return {
    transaction_id: transaction_id,
    user_id: user_id,
    rater_id: rater_id,
    rate: rate,
    comment: comment ? comment : faker.lorem.sentence()
  };
    
},
createMany: function(count: number, transaction_id: number, user_id: number, rater_id: number, rate: number, comment?: string): Ratings[] {
    const ratings: Ratings[] = [];
    for (let i=0; i < count; i++) {
        ratings.push(this.create(transaction_id, user_id, rater_id, rate, comment))
    }
    return ratings;
}
    

};
export default FakeRatings