const express = require("express");
const router = express.Router();
const adSchema = require("../models/ad");
const mongoose = require("mongoose");
router.post("/", async (req, res) => {
  const {
    title,
    description,
    price,
    seller,
    category,
    interestedBuyers,
    buyer,
  } = req.body;

  const newAdObj = new adSchema({
    title,
    description,
    price,
    seller,
    category,
    interestedBuyers,
    buyer,
  });

  try {
    const savedAd = await newAdObj.save();
    res.status(201).send("ad uploaded");
  } catch (err) {
    res.status(501).send(err.message);
  }
});

router.get("/alladds", async (req, res) => {
  try {
    const allAdds = await adSchema.find({}).populate("category");
    res.status(200).send(allAdds);
  } catch (error) {
    res.send(501).send(error.message);
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id.toString();
  try {
    const addDetails = await adSchema.findById(id);
    res.status(200).send(addDetails);
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id.toString();
  try {
    const deletedItem = await adSchema.findByIdAndDelete(id);
    res.status(200).send(deletedItem);
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.get("/getuserAdds/:id", async (req, res) => {
  const id = req.params.id.toString();
  try {
    const addsPostedByASingleUser = await adSchema.find({ seller: id });
    res.status(200).send(addsPostedByASingleUser);
  } catch (error) {
    res.status(501).send(error.message);
  }
});
module.exports = router;
