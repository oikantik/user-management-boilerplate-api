const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

const User = require("../../models/User");
const secretJWT = config.get("secretJWT");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the login page",
  });
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const user = await User.findOne({ email });
    const validate = await user.isValidPassword(password);
    if (!validate)
      return res.status(400).json({
        success: false,
        message: "Unauthorized Access",
      });
    const token = jwt.sign({ id: user.id }, secretJWT, {
      expiresIn: "2d",
    });
    console.log(token);
    res.status(200).json({
      success: false,
      message: "Login Successful",
      payload: {
        token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
