const bcrypt = require("bcryptjs");

const express = require("express");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  if (!email || !name || !password || !confirmPassword) {
    return res.status(400).send("All fields are required");
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .send("pasword and confirmation password do not match");
  }

  const existingUser = await UserModel.findOne({ email: email });

  if (existingUser !== null) {
    return res.status(400).send("Email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(hash);

  const newUser = new UserModel({
    name,
    email,
    password: hash,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).send("user created with id: " + savedUser.id);
  } catch (e) {
    res.status(501).send(e.message);
  }
});

router.post("/login", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUserEmail = await UserModel.findOne({ email: email });

  if (!existingUserEmail) {
    return res
      .status(400)
      .send("you may need to sign Up, name and email doesnt exist");
  } else {
    try {
      let isCorrect = await bcrypt.compare(
        password,
        existingUserEmail.password
      );
      if (isCorrect) {
        const payload = {
          id: existingUserEmail.id,
          email: existingUserEmail.email,
        };
        const accesToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json(accesToken);
      } else {
        return res.status(404).send("wrong password");
      }
    } catch (error) {
      return res.status(501).send("error" + error.message);
    }
  }
});
module.exports = router;
