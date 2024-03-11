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
    const { text: title, nr = 3 } = req.body;
    try {
      const category = await prisma.categories.create({
        data: {
          title: title,
          nr: nr,
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
    const { text: title, nr } = req.body;
    try {
      const category = await prisma.categories.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title: title,
          nr: nr,
        },
      });
      res.status(200).json({ status: "updated succesfully", data: {category}});
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