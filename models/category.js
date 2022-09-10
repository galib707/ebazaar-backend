// title, descritption, price, seller, (user id), category
// categorY: // name, active (boolean), createdAt
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const categoryModel = new mongoose.model("Category", categorySchema);
module.exports = categoryModel;
