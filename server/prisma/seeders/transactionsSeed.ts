import { PrismaClient } from "@prisma/client";
import FakeTransactions from "./fakeData/fakeTransactions";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const transactionsSeed = async () => {
  const users = await prisma.users.findMany({
    take: 10,
    
  });
  // console.log(users)
  const transactionsList = [];
  for (let i = 0; i < users.length; i++) {
      
  
    const user1 = users[i];
    const user2 = users[(i + 1) % users.length];
    
  const [item1Exchange] = await prisma.items.findMany({
    where: {
      users_id: user1.id,
      exchange: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });

  const [item2Exchange] = await prisma.items.findMany({
    where: {
      users_id: user2.id,
      exchange: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    }
  });
  if (!item1Exchange || !item2Exchange) {
    console.log("No items found for exchange.");
    return;
  }
  // console.log(items)
  const exchangeTransaction = FakeTransactions.create(
    user1.id, user2.id, item1Exchange.id, item2Exchange.id, 0)
    transactionsList.push(exchangeTransaction);

//    console.log(transactionsList)

    const [itemForSale] = await prisma.items.findMany({
      where: {
        users_id: user1.id,
        for_sale: true,
      },
      take: 1,
      orderBy: {
        created_at: "desc",
      }
    })
if (!itemForSale) {
  console.log("No items found for sale.");
  return;
}
const randomBuyer = users.find(u=> u.id !== user1.id)
if (!randomBuyer) {
    console.log("Nepavyko rasti atsitiktinio pirkėjo.");
    return;
}
    const randomPrice = new Decimal(Math.floor(Math.random() * 100) + 1);
    const price = new Decimal(itemForSale.price);
    const finalPrice = price.plus(randomPrice).toNumber();

    const saleTransaction = FakeTransactions.create(
      user1.id,
      randomBuyer.id,
      itemForSale.id,
      null,
      finalPrice
    );
    transactionsList.push(saleTransaction);
  
    }
//   console.log(transactionsList)
  await prisma.transactions.createMany({ data: transactionsList });

  console.log("Transactions created successfully.");
};

export default transactionsSeed;
