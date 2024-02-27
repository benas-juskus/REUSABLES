const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

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

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

app.get('/test', (req, res) => {
  async function main() {
    // const { table } = prisma.user;
    const users = await prisma.user.findMany()
    console.log(users)
    res.send(users)
  //   pool.query(`select * from prisma`, (err, results) => {
  //   if (err) {
  //     return res.send(err);
  //   } else {
  //     return res.send(results);
  //   }
  // });
  }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
});