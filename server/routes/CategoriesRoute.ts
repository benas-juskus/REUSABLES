import express from "express";
const CategoriesController = require("../controller/CategoriesController");
const router = express.Router();

router.get("/first", CategoriesController.getCategory);
router.get("/", CategoriesController.getAllCategories);
router.get("/:id", CategoriesController.getCategoryById);
router.post("/", CategoriesController.createCategory);
router.patch("/:id", CategoriesController.updateCategory);
router.delete("/:id", CategoriesController.deleteCategory);

module.exports = router;
