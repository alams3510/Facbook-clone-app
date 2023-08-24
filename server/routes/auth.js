const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { findOne } = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const users = await newUser.save();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (!data) {
      return res.status(404).json("User not Found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      data.password
    );
    if (!validPassword) {
      return res.status(400).json("password Incorrect");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("error");
  }
});
module.exports = router;
