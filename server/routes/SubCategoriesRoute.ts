import express from "express";
const SubCategoriesController = require("../controllers/SubCategoriesController");
const router = express.Router();

router.get("/first", SubCategoriesController.getSubCategory);
router.post("/", SubCategoriesController.createSubCategory);
router.delete("/delmany", SubCategoriesController.deleteSelectedSubCategories);
router.patch("/:id", SubCategoriesController.updateSubCategory);
router.delete("/:id", SubCategoriesController.deleteSubCategory);

module.exports = router;
