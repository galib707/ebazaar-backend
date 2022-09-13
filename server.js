const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const adRouter = require("./routes/ad");
const port = process.env.PORT || 8000;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
const DB_URI =
  "mongodb+srv://1234:1234@cluster0.t2vhtau.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/ad", adRouter);

app.listen(port, () => {
  console.log(`eBazaar api is listening with ${port}`);
});
