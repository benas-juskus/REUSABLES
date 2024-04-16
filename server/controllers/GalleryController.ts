import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
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

module.exports = {
  updateItemPhoto: async function (req: Request, res: Response) {
    try {
      const photo_id = req.params.photoID;
      const user_id = req.params.id;
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
      const photo = await prisma.gallery.update({
        where: {
          id: Number(photo_id),
        },
        data: {
          photo: file_name,
        },
      });
      res.status(201).json({ status: "updated succesfully", data: { photo } });
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
  getAllPhotos: async function (req: Request, res: Response) {
    try {
      const photo = await prisma.gallery.findMany({
        select: { photo: true}
      });
      res.status(201).json({status: "Success", data: {photo}})
    } catch (error) {
      if (hasMessage(error)) {
        res.status(500).json({ msg: error.message });
      }
    }
  },
};
