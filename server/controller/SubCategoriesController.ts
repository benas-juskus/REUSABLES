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
  getSubCategory: async function (req: Request, res: Response) {
    try {
      const response = await prisma.subCategories.findFirst();
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  getAllSubCategories: async function (req: Request, res: Response) {
    try {
      const response = await prisma.subCategories.findMany(
        {include:{Category:true}}
      );
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  getSubCategoryById: async function (req: Request, res: Response) {
    try {
      const response = await prisma.subCategories.findUnique({
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
  getAllSubCategoriesByCategory: async function (req: Request, res: Response) {
    try {
      const response = await prisma.subCategories.findMany({
        where: {
          category_id: Number(req.params.id),
        },
      });
      console.log(req.params)
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  createSubCategory: async function (req: Request, res: Response) {
    const { category_id, title, nr } = req.body;
    try {
      const subCategory = await prisma.subCategories.create({
        data: {
          category_id: category_id,
          title: title,
          nr: nr
        },
      });
      res.status(201).json({ status: "created succesfully", data: {subCategory}});
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  updateSubCategory: async function (req: Request, res: Response) {
    const { category_id, title, nr } = req.body;
    try {
      const subCategory = await prisma.subCategories.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          category_id: category_id,
          title: title,
          nr: nr
        },
      });
      res.status(200).json({ status: "updated succesfully", data: {subCategory}});
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  deleteSubCategory: async function (req: Request, res: Response) {
    try {
      const subCategory = await prisma.subCategories.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({ status: "deleted succesfully", data: {subCategory}});
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
};
