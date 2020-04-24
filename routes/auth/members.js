const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
  passport.authenticate("jwt", (err, user) => {
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
    res.status(200).json({
      success: true,
      message: "Login Successful",
    });
  })(req, res, next);
});

module.exports = router;
