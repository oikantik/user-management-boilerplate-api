const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");

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

module.exports = router;
