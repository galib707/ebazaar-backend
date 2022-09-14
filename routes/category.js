const express = require("express");
const categoryModel = require("../models/category");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  // const existingUserEmail = await UserModel.findOne({ email: email });
  // const existingUserName = await UserModel.findOne({ name: name });
  console.log(req);

  if (!name) {
    return res.status(400).send("name is required");
  }
  const newCategory = new categoryModel({
    name,
  });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).send("category added" + savedCategory.id);
  } catch (e) {
    res.status(501).send(e.message);
  }
});

router.get("/allcategories", async (req, res) => {
  try {
    const allCategories = await categoryModel.find({});
    res.status(201).json(allCategories);
  } catch (e) {
    res.status(501).send(e.message);
  }
});
router.get("/:eachCategory", async (req, res) => {
  let categoryName = req.params.eachCategory;
  try {
    const allCategories = await categoryModel.find({});
    res.status(201).json(allCategories);
  } catch (e) {
    res.status(501).send(e.message);
  }
});

module.exports = router;
