import express from "express";
const SubCategoriesController = require("../controllers/SubCategoriesController");
const CategoriesController = require("../controllers/CategoriesController");
const router = express.Router();

router.get("/first", CategoriesController.getCategory);
router.get("/", CategoriesController.getAllCategories);
router.post("/", CategoriesController.createCategory);
router.delete("/delmany", CategoriesController.deleteSelectedCategories);
router.get("/:id", CategoriesController.getCategoryById);
router.get("/all/subcategories", SubCategoriesController.getAllSubCategories);
router.get("/:idi/subcategories/:id", SubCategoriesController.getSubCategoryById);
router.get("/:id/subcategories", SubCategoriesController.getAllSubCategoriesByCategory);
router.patch("/:id", CategoriesController.updateCategory);
router.delete("/:id", CategoriesController.deleteCategory);

module.exports = router;
