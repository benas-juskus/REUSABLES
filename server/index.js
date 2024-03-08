// const cors = require('cors');
// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// const app = express();

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST_IP,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

// app.use(cors());
// app.use(bodyParser.json());

// app.listen(process.env.REACT_APP_SERVER_PORT, () => {
//   console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
// });

// app.post('/test', (req, res) => {

//   console.log('request body', req.body);
//   let email = req.body.email;
//   let password = req.body.password;
//   console.log(email, password);

//   async function main() {
//     const user = await prisma.users.findUnique({
//       where: {
//         email: email,
//       }
//     })
//     if (user){
//       console.log('user found', user);
//       if (password == user.password){
//         res.send({user, message: 'user is logged in', passMatch: true})
//       } else {
//         res.send({user, message: 'user is not logged in', passMatch: false, errMsgPass: 'Password does not match'})
//       }
//     } else {
//       res.send({errMsgMail: 'no user with that email'})
//     }
//   }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
// });
