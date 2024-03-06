import express from "express";
const SubCategoriesController = require("../controller/SubCategoriesController");
const router = express.Router();

router.get("/first", SubCategoriesController.getSubCategory);
router.get("/all", SubCategoriesController.getAllSubCategories);
router.get("/:id", SubCategoriesController.getSubCategoryById);
router.post("/", SubCategoriesController.createSubCategory);
router.patch("/:id", SubCategoriesController.updateSubCategory);
router.delete("/:id", SubCategoriesController.deleteSubCategory);

module.exports = router;
