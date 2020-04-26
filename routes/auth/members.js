const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");

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
    const allMembers = await User.find(
      {},
      "name email dob gender address userRole website phone aboutMe"
    );
    res.status(200).json({
      success: true,
      message: "Login Successful",
      members: allMembers,
      count: countMembers,
    });
  })(req, res, next);
});

module.exports = router;
