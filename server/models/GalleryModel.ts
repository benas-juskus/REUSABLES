import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient();

module.exports = {
    getPhotoById: async function (photo_id:number) {
        const photo = await prisma.gallery.findUnique({
            where: {id: photo_id },
            select: { photo:true }
        })
    }
}