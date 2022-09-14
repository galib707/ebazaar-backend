const express = require("express");
const router = express.Router();
const adSchema = require("../models/ad");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  const {
    title,
    description,
    price,
    seller,
    category,
    interestedBuyers,
    buyer,
  } = req.body;

  const image = req.file;

  if (!title || !description || !price || !seller || !image || !category) {
    return res.status(400).send("All fields are required");
  }
  const newAdObj = new adSchema({
    title,
    description,
    price,
    seller,
    category,
    interestedBuyers,
    buyer,
    imageUrl: "upload/" + image.filename,
  });

  try {
    const savedAd = await newAdObj.save();
    return res.status(201).send(`ad uploaded with id ${savedAd._id}`);
  } catch (err) {
    return res.status(501).send(err.message);
  }
});

router.get("/alladds", async (req, res) => {
  try {
    const allAdds = await adSchema.find({}).populate("category");
    return res.status(200).send(allAdds);
  } catch (error) {
    return res.send(501).send(error.message);
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id.toString();
  try {
    const addDetails = await adSchema.findById(id);
    return res.status(200).send(addDetails);
  } catch (error) {
    return res.status(501).send(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id.toString();
  try {
    const deletedItem = await adSchema.findByIdAndDelete(id);
    return res.status(200).json(deletedItem);
  } catch (error) {
    return res.status(501).send(error.message);
  }
});

router.get("/getuserAdds/:id", async (req, res) => {
  const id = req.params.id.toString();
  try {
    const addsPostedByASingleUser = await adSchema.find({ seller: id });
    return res.status(200).send(addsPostedByASingleUser);
  } catch (error) {
    return res.status(501).send(error.message);
  }
});
module.exports = router;
