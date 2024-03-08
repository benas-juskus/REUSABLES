import express from "express";
const ItemsController = require("../controller/ItemsController");
const router = express.Router();

router.get("/first", ItemsController.getItem);
router.get("/all", ItemsController.getAllItems);
router.post("/", ItemsController.createItem);
router.delete("/delmany", ItemsController.deleteManyItems);
router.get("/:id", ItemsController.getItemById);
router.patch("/:id", ItemsController.updateItem);
router.delete("/:id", ItemsController.deleteItem);

module.exports = router;