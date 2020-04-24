const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const { registrationValidation } = require("../../middleware/validator");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the registration page",
  });
});

router.post("/", registrationValidation, async (req, res) => {
  try {
    const { name, email, password, dob, gender } = req.body.data;
    const ifUser = await User.findOne({ email });
    if (ifUser)
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    const user = new User({
      name,
      email,
      password,
      dob,
      gender,
      provider: "local-jwt",
      providerID: "",
    });
    const response = await user.save();
    res.status(200).json({
      success: true,
      message: "Registration Successful",
      payload: {
        id: response.id,
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
