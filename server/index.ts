// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {

//     // const users = await prisma.users.findMany()
//     // console.log(users);
//     try {
//       const user = await prisma.users.create({
//         data: {
//           username: 'kevin',
//           email: 'kevin@mail.com',
//           password: 'kevin123',
//         }
//       })
//       console.log(user);

//     } catch (error) {
//       console.log(error);
//     }

//     }


// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// import { PrismaClient } from '@prisma/client';

// async function main() {
//   const prisma = new PrismaClient();

//   try {
//     await prisma.$connect(); // Connect to the database
//     console.log('Prisma client connected successfully.');

//     // Perform database operation to create a user
//     const user = await prisma.users.create({
//       data: {
//         username: 'kevin',
//         email: 'kevin@mail.com',
//         password: 'kevin123',
//       }
//     });
//     console.log('User created:', user);
//   } catch (error) {
//     console.error('Error during Prisma client initialization:', error);
//   } finally {
//     await prisma.$disconnect(); // Disconnect from the database
//   }
// }

// main().catch(error => {
//   console.error('Error in main function:', error);
//   process.exit(1);
// });

// import dotenv from 'dotenv' 
// dotenv.config()
import express, { Request, Response } from 'express'
import cors from 'cors'

const bodyParser = require('body-parser');

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express()

const port = process.env.APP_PORT || 8000

app.use(express.json())
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

// app.post('/categories/', async (req, res) => {
//     try {
//         // Here you can handle the received data, for example, save it to a database
//         console.log('Received data:', req.body);
//         const { text: title, nr = 3 } = req.body; // Destructure the request body

//         // Assuming 'prisma' is properly imported and configured
//         const category = await prisma.categories.create({
//             data: {
//                 title: title,
//                 nr: nr,
//             },
//         });

//         // Send a success response
//         res.status(201).json({ status: "created successfully", data: { category } });
//     } catch (error) {
//         // If there's an error, send an error response
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Failed to save data' });
//     }
//   });

const CategoriesRouter = require("./routes/CategoriesRoute")
app.use("/categories/", CategoriesRouter)
const SubCategoriesRouter = require("./routes/SubCategoriesRoute")
app.use("/categories/:idi/subcategories", SubCategoriesRouter)

  

app.get("/test", async (req, res) => {
    try {
        const categories = await prisma.categories.findMany({
            include: {
              SubCategories: true
            }
          });
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

export default app