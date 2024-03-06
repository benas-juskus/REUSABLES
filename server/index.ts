import express, { Request, Response } from "express";
import cors from "cors";
import * as mysql from "mysql";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const CategoriesRouter = require("./routes/CategoriesRoute");
app.use("/categories/", CategoriesRouter);
const SubCategoriesRouter = require("./routes/SubCategoriesRoute");
app.use("/categories/:idi/subcategories", SubCategoriesRouter);

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(
    `App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`
  );
});

module.exports = app;
