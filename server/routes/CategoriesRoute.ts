import express from "express";
const SubCategoriesController = require("../controller/SubCategoriesController");
const CategoriesController = require("../controller/CategoriesController");
const router = express.Router();

router.get("/first", CategoriesController.getCategory);
router.get("/", CategoriesController.getAllCategories);
router.get("/:id", CategoriesController.getCategoryById);
router.get("/:id/subcategories", SubCategoriesController.getAllSubCategoriesByCategory);
router.post("/", CategoriesController.createCategory);
router.patch("/:id", CategoriesController.updateCategory);
router.delete("/:id", CategoriesController.deleteCategory, (req, res, next) => {
    console.log("deleted successfully");
    next();
  });

module.exports = router;
