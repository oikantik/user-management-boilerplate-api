const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const User = require("../../models/User");
const { updateProfileValidation } = require("../../middleware/validator");

router.get("/", (req, res, next) => {
  passport.authenticate("jwt", async (err, user) => {
    if (err)
      return res.status(400).json({
        success: false,
        message: "Unauthorized Access",
      });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    const {
      name,
      email,
      dob,
      gender,
      aboutMe,
      address,
      phone,
      website,
      userRole,
    } = user;
    res.status(200).json({
      success: true,
      message: "Login Successful",
      name,
      email,
      dob: moment(dob).format("YYYY-MM-DD"),
      gender,
      aboutMe,
      address,
      phone,
      website,
      userRole,
    });
  })(req, res, next);
});

router.post("/", updateProfileValidation, (req, res, next) => {
  passport.authenticate("jwt", async (err, user) => {
    if (err)
      return res.status(400).json({
        success: false,
        message: "Unauthorized Access",
      });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    const {
      name,
      email,
      dob,
      gender,
      aboutMe,
      address,
      phone,
      website,
      userRole,
    } = req.body.data;
    const response = await User.findByIdAndUpdate(
      { _id: user.id },
      { name, email, dob, gender, aboutMe, address, phone, website, userRole },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updated: true,
      message: "Update Successful",
      name: response.name,
      email: response.email,
      gender: response.gender,
      aboutMe: response.aboutMe,
      address: response.address,
      phone: response.phone,
      website: response.website,
      userRole: response.userRole,
      dob: moment(response.dob).format("YYYY-MM-DD"),
    });
  })(req, res, next);
});

module.exports = router;
