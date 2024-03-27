import express from "express";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });
const ItemsController = require("../controllers/ItemsController");
const GalleryController = require("../controllers/GalleryController");
const router = express.Router();

router.get("/first", ItemsController.getItem);
router.get("/all", ItemsController.getAllItems);
router.get("/rand5", ItemsController.get5RandomItems);
router.get("/rand3", ItemsController.get3RandomItems);
router.get("/photos", GalleryController.getAllPhotos);
router.post("/", upload.single('photo'), ItemsController.createItem);
router.delete("/delmany", ItemsController.deleteManyItems);
router.get("/:id", ItemsController.getItemById);
router.patch("/:id", ItemsController.updateItem);
router.patch("/:id/updatePhoto/:photoID", upload.single('photo'), GalleryController.updateItemPhoto);
router.delete("/:id", ItemsController.deleteItem);

module.exports = router;