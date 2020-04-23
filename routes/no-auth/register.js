const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.get("/", (req, res) => {
  res.json({ response: "welcome to registration page" });
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password, dob, gender } = req.body.data;
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
    res.status(200).json({ success: true, id: response.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
