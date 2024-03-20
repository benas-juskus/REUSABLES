import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
var fs = require("node:fs/promises");

const prisma = new PrismaClient();

function hasMessage(x: unknown): x is { message: string } {
  return Boolean(
    typeof x === "object" &&
      x &&
      "message" in x &&
      typeof x.message === "string"
  );
}

// interface MulterRequest extends Request {
//   file.mimetype: any;
// }

// public document = async (req: Request, res: Response): Promise<any> => {
//  const documentFile  = (req as MulterRequest).file;
// }

module.exports = {
  getItem: async function (req: Request, res: Response) {
    try {
      const response = await prisma.items.findFirst();
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  getAllItems: async function (req: Request, res: Response) {
    console.log("fetching");
    try {
      const response = await prisma.items.findMany();
      res.status(200).json(response);
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  getItemById: async function (req: Request, res: Response) {
    try {
      const response = await prisma.items.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      if (response == null) {
        res.status(200).json({ status: response, msg: "No Item Found" });
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  createItem: async function (req: Request, res: Response) {
    console.log("received", req.body);
    const {
      user_id: user_id,
      subcategories_id: subcategories_id,
      tradesubcategories_id: tradesubcategories_id,
      name: name,
      description: description,
      price: price,
      for_sale: for_sale,
      exchange: exchange,
      visibility: visibility,
    } = req.body;
    try {
      console.log("proccesing image", req.body.photo);
      const ext: { [key: string]: string } = {
        "image/webp": ".webp",
        "image/png": ".png",
        "image/jpeg": ".jpg",
      };
      let file_name =
        req.file?.filename.slice(0, 6) +
        "_" +
        Number(user_id) +
        ext[req.file?.mimetype as keyof typeof ext];
      await fs.rename(req.file?.path, "public/images/" + file_name);
      const photo = await prisma.gallery.create({
        data: {
          user_id: Number(user_id),
          photo: file_name,
        },
      });
      console.log("inserting data");

      const item = await prisma.items.create({
        data: {
          users_id: Number(user_id),
          subCategories_id: Number(subcategories_id),
          name: String(name),
          photo_id: Number(photo.id),
          description: String(description),
          price: Number(price),
          for_sale: Boolean(for_sale),
          exchange: Boolean(exchange),
          visibility: Boolean(visibility),
        },
      });

      const exchangeTo = await prisma.exchangeTo.create({
        data: {
          items_id: Number(item.id),
          subCategories_id: Number(tradesubcategories_id),
        },
      });

      res.status(201).json({ status: "created succesfully", data: { item, exchangeTo } });
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
        console.log(error);
      }
    }
  },
  updateItem: async function (req: Request, res: Response) {
    const {
      item_id,
      user_id,
      subcategories_id,
      name,
      description,
      photo_id,
      price,
      for_sale,
      exchange,
      visibility,
    } = req.body;
    try {
      const item = await prisma.items.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          id: Number(item_id),
          users_id: Number(user_id),
          subCategories_id: Number(subcategories_id),
          name: String(name),
          description: String(description),
          price: Number(price),
          for_sale: Boolean(for_sale),
          exchange: Boolean(exchange),
          visibility: Boolean(visibility),
        },
      });
      res.status(200).json({ status: "updated succesfully", data: { item } });
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  deleteItem: async function (req: Request, res: Response) {
    try {
      const photo = await prisma.items.findUnique({
        where: { id: Number(req.params.id) },
        select: { photo: true },
      });
      console.log(photo?.photo);
      fs.unlink("public/images/" + photo?.photo, (err: any) => {
        if (err) console.log(err);
        else {
          console.log("\nDeleted file:" + photo);
        }
      });
      const item = await prisma.items.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({ status: "deleted succesfully", data: { item } });
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  deleteManyItems: async function (req: Request, res: Response) {
    const { ids } = req.body;
    try {
      const photos = await prisma.items.findMany({
        where: { id: { in: ids } },
        select: { photo: true },
      });
      for (let i = 0; i < photos.length; i++) {
        fs.unlink("public/images/" + photos[i].photo, (err: any) => {
          if (err) console.log(err);
          else {
            console.log("\nDeleted file:" + photos[i].photo);
          }
        });
      }
      const items = await prisma.items.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      res.status(200).json({ status: "deleted succesfully", data: { items } });
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
};
