const express = require("express");
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { log } from "console";
import { PrismaClient } from "@prisma/client";
// import { log } from 'console';
const UserModel = require("../models/UserModel.ts");
const bcryptjs = require("bcryptjs");
const prisma = new PrismaClient();

function dataValidation(req: Request) {
  const errorMessages = validationResult(req);

  if (!errorMessages.isEmpty()) {
    const errorMsg = errorMessages.array();
    // const errorMsg = errorMessages.array().map(error => error.msg);  // <==== Use to send JUST the error messages in response
    return errorMessages;
  } else {
    return true;
  }
}

const UserControler = {
  show: async (req: Request, res: Response) => {
    const data = req.body;
    console.log("data", data);

    try {
      const user = await UserModel.showOne(data);
      if (user) {
        //here logic to check if token is ok then show user
        res.json(user);
      } else {
        res.json({ message: "user not found" });
      }
    } catch (error) {
      console.log(error);
      res.json({ message: error });
    }
  },
  showAll: async (req: Request, res: Response) => {
    try {
      const users = await UserModel.showAll();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  },
  createUser: async (req: Request, res: Response) => {
    const data = req.body;
    const hashedPassword = await bcryptjs.hash(data.password, 10);
    data.password = hashedPassword;
    let censorUserName = false;

    try {
        const censor = await prisma.censorship.findMany();
        console.log(censor);

        for (let word of censor) {
          console.log("word", word.string);
          console.log("data.username", data.username);
          console.log(data.username === word.string);
          if (data.username === word.string) {
            censorUserName = true;
          } 
        }
      } catch (error) {
        console.log(error);
      }


    const validation = dataValidation(req);

    if (validation !== true) {
      return res.status(400).json({ validation });
    } else {
      try {
        const user = await UserModel.showOne(data);
        if (user) {
          if (user.username == data.username) {
            res.status(403).json({
              message:
                "User with this username already exists, please use another username",
            });
          } else if (user.email == data.email) {
            res.status(403).json({
              message: "User with this email already exists",
            });
          } else res.status(403).json({ message: "User already exists" });
        } else {
          if (censorUserName) {
            res.status(403).json({ message: "Use of bad language is not allowed!" });
          } else {
            const new_user = await UserModel.create(data);
            res
              .status(200)
              .json({ user: new_user, message: "User created successfully" });
          }
         
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
    }
  },
  update: async (req: Request, res: Response) => {
    let data = req.body;
    const user_id = req.params.id;

    const validation = dataValidation(req);

    if (validation !== true) {
      return res.status(400).json({ validation });
    } else {
      try {
        const updatedUser = await UserModel.update(user_id, data);
        res
          .status(200)
          .json({ user: updatedUser, message: "User updated successfully!" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
    }
  },
  updatePassword: async (req: Request, res: Response) => {
    const user_id = req.params.id;
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    let data = { password: hashedPassword };

    const validation = dataValidation(req);

    if (validation !== true) {
      return res.status(400).json({ validation });
    } else {
      try {
        await UserModel.update(user_id, data);
        res.status(200).json({ message: "Password updated successfully!" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
    }
  },
  destroy: async (req: Request, res: Response) => {
    const user_id = req.params.id;

    try {
      const deletedUser = await UserModel.delete(user_id);
      res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  },
};

module.exports = UserControler;
