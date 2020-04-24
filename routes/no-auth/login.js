const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

const { LoginValidation } = require("../../middleware/validator");
const User = require("../../models/User");
const secretJWT = config.get("secretJWT");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the login page",
  });
});

router.post("/", LoginValidation, async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    const validate = await user.isValidPassword(password);
    if (!validate)
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    const token = jwt.sign({ id: user.id }, secretJWT, {
      expiresIn: "2d",
    });
    res.status(200).json({
      success: true,
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
