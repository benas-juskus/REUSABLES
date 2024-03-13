import express from "express";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });
const ItemsController = require("../controller/ItemsController");
const GalleryController = require("../controller/GalleryController");
const router = express.Router();

router.get("/first", ItemsController.getItem);
router.get("/all", ItemsController.getAllItems);
router.post("/", upload.single('photo'), ItemsController.createItem);
router.delete("/delmany", ItemsController.deleteManyItems);
router.get("/:id", ItemsController.getItemById);
router.patch("/:id", ItemsController.updateItem);
router.patch("/:id/updatePhoto/:photoID", upload.single('photo'), GalleryController.updateItemPhoto);
router.delete("/:id", ItemsController.deleteItem);

module.exports = router;