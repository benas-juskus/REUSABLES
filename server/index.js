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

app.listen(3000, () => {
  console.log(`App server now listening on port ${3000}`);
});



var bcrypt = require('bcryptjs');

//Pavydziai:
//Šifravimo ilgume irašomas skaičius kuris nurodo kiek kartu praeis šifravimo ciklą (Iprastai skaičius 10). kuo didesnis skaičius tuo slaptažodis saugesnis, bet vietos irgi daugiau užims

// password: bcrypt.hashSync('SLAPTAZODIS', 'Šifravimo ilgumas')

//Slaptažodžių palyginimas
//Palyginą vartotojo ivesta slaptažodi su šifruotu slaptažodžiu iš DB
//Jeigu slaptažodis teisingas gražins 'true' jeigu ne 'false'

// bcrypt.compareSync('SLAPTAZODIS', 'SLAPTAZODIS IS DB')


//Sukurti vartotoja
app.get('/test', (req, res) => {
  async function main() {
    const prisma = new PrismaClient();
    
    try {
      await prisma.$connect();
      console.log('Prisma client connected successfully.');
  
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
      await prisma.$disconnect();
    }
  }
  
  main().catch(error => {
    console.error('Error in main function:', error);
    process.exit(1);
  });

  })



  
  //Slaptažodžio palyginimas
  app.get('/check', (req, res) => {
    async function main() {
      const prisma = new PrismaClient();
      
      try {
        await prisma.$connect();
        console.log('Prisma client connected successfully.');
    
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
        await prisma.$disconnect();
      }
    }
    
    main().catch(error => {
      console.error('Error in main function:', error);
      process.exit(1);
    });
  
    })
