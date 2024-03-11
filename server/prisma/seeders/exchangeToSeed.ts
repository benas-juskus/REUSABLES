import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exchangeToSeed = async () => {
        const exchangeToItems = await prisma.items.findMany({
            where: {
                exchange: true
            }
        });
        for (const item of exchangeToItems) {
            try {
                
                await prisma.exchangeTo.upsert({
                    where: {
                        id: item.id
                    },
                    update: {
                        Item: {
                            connect: {
                                id: item.id

                            }
                        },
                        SubCategories: {
                            connect: {
                                id: item.subCategories_id
                            }

                        }
                        },
                    
                    create: {
                        Item: {
                            connect: {
                                id: item.id,
                                
                            }
                        },
                        SubCategories: {
                            connect: {
                                id: item.subCategories_id
                            }
                        }
                        
                            // subCategories_id: item.subCategories_id                   }
                 }    
                 });
            } catch (error) {
                console.error(`Error creating/updating ExchangeTo record for item ${item.id}: ${error}`);
            }
        }
        
        console.log("Items created/updated for ExchangeTo")
    }

    export default exchangeToSeed