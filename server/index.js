const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const { mainModule } = require('process');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(cors());

app.listen(3001, () => {
  console.log(`App server now listening on port ${3001}`);
});



var bcrypt = require('bcryptjs');



app.get('/test', (req, res) => {
  async function main() {
    const prisma = new PrismaClient();
    
    try {
      await prisma.$connect(); // Connect to the database
      console.log('Prisma client connected successfully.');
  
      // Perform database operation to create a user
      const user = await prisma.users.create({
        data: {
          username: 'david',
          email: 'david@mail.com',
          password: bcrypt.hashSync('david123', 10),
        }
      });
      console.log('User created:', user);
    } catch (error) {
      console.error('Error during Prisma client initialization:', error);
    } finally {
      res.json(prisma.users.findMany({})),
      await prisma.$disconnect(); // Disconnect from the database
    }
  }
  
  main().catch(error => {
    console.error('Error in main function:', error);
    process.exit(1);
  });

  })



  

  app.get('/check', (req, res) => {
    async function main() {
      const prisma = new PrismaClient();
      
      try {
        await prisma.$connect(); // Connect to the database
        console.log('Prisma client connected successfully.');
    
        // Perform database operation to create a user
        const user = await prisma.users.findMany({});

        if (bcrypt.compareSync('kevin123', user[1].password)) {
          res.json({
            success: true
          })
          
        } else {
          res.json({
            success: false
          })
        }



      } catch (error) {
        console.error('Error during Prisma client initialization:', error);
      } finally {
        await prisma.$disconnect(); // Disconnect from the database
      }
    }
    
    main().catch(error => {
      console.error('Error in main function:', error);
      process.exit(1);
    });
  
    })
