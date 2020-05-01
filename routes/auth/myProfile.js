const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const multer = require("multer");

const User = require("../../models/User");
const { updateProfileValidation } = require("../../middleware/validator");

const avatarStorage = require("../../utils/avatarStorage");
const storage = multer.diskStorage(avatarStorage);
const upload = multer({ storage });

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
      avatarUrl,
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
      avatarUrl,
    });
  })(req, res, next);
});

router.post(
  "/",
  upload.single("avatar"),
  updateProfileValidation,
  (req, res, next) => {
    passport.authenticate("jwt", async (err, user) => {
      const fileName = typeof req.file === "undefined" ? "" : req.file.filename;
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
      const avatarUrl =
        fileName !== ""
          ? fileName
          : typeof user.avatarUrl !== "undefined"
          ? user.avatarUrl
          : "";
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
      } = req.body;
      const response = await User.findByIdAndUpdate(
        { _id: user.id },
        {
          name,
          email,
          dob,
          gender,
          aboutMe,
          address,
          phone,
          website,
          userRole,
          avatarUrl,
        },
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
        avatarUrl: response.avatarUrl,
        dob: moment(response.dob).format("YYYY-MM-DD"),
      });
    })(req, res, next);
  }
);

module.exports = router;
