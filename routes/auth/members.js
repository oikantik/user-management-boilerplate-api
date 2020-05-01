const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const moment = require("moment");
const multer = require("multer");

const {
  getMemberProfileValidation,
  updateProfileValidation,
} = require("../../middleware/validator");

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
    const countMembers = await User.estimatedDocumentCount();
    const allMembers = await User.find({}, "name email userRole");
    res.status(200).json({
      success: true,
      message: "Login Successful",
      members: allMembers,
      count: countMembers,
    });
  })(req, res, next);
});

router.post("/profile", getMemberProfileValidation, (req, res, next) => {
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
    const getUser = await User.findOne({ email: req.body.data.memberEmail });
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
    } = getUser;
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
  "/update-profile",
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
      const member = await User.findOne({ email });
      const avatarUrl =
        fileName !== ""
          ? fileName
          : typeof member.avatarUrl !== "undefined"
          ? member.avatarUrl
          : "";
      const response = await User.findOneAndUpdate(
        { email },
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
