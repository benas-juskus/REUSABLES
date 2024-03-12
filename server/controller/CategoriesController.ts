import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function hasMessage(x: unknown): x is { message: string } {
  return Boolean(
    typeof x === "object" &&
      x &&
      "message" in x &&
      typeof x.message === "string"
  );
}

module.exports = {
  getCategory: async function (req: Request, res: Response) {
    try {
      const response = await prisma.categories.findFirst();
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  getAllCategories: async function (req: Request, res: Response) {
    try {
      const response = await prisma.categories.findMany();
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  getCategoryById: async function (req: Request, res: Response) {
    try {
      const response = await prisma.categories.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  createCategory: async function (req: Request, res: Response) {
    console.log("received", req.body);
    const { text: title, nr: number } = req.body;
    try {
      const category = await prisma.categories.create({
        data: {
          title: title,
          nr: Number(number),
        },
      });

      res.status(201).json({ status: "created succesfully", data: {category}});
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  updateCategory: async function (req: Request, res: Response) {
    console.log("received", req.body);
    const { text: title, Nr: Nr, category_id: category_id } = req.body;
    try {
      if (title == undefined || title == ''){
        const category = await prisma.categories.updateMany({
          where: {
            id: category_id,
          },
          data: {
            nr: Number(Nr),
          },
        });
        res.status(200).json({ status: "updated succesfully", data: {category}});
        console.log("Changed number")
  }
  else if (Nr == undefined || Nr == '' || Nr == isNaN(Nr) || !Nr) {
    const category = await prisma.categories.updateMany({
      where: {
        id: category_id,
      },
      data: {
        title: title,
      },
    });
    res.status(200).json({ status: "updated succesfully", data: {category}});
    console.log("Changed title", category_id, title, Nr)
  } else {
    const category = await prisma.categories.updateMany({
      where: {
        id: category_id,
      },
      data: {
        title: title,
        nr: Number(Nr),
      },
    });
      res.status(200).json({ status: "updated succesfully", data: {category}});
    }
    console.log("Changed", category_id, Nr, title)
  } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  deleteCategory: async function (req: Request, res: Response) {
    try {
      const subcategory = await prisma.subCategories.deleteMany({
        where: {
          category_id: Number(req.params.id),
        },
      });
      const category = await prisma.categories.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({ status: "deleted succesfully", data: {category}});
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
};
