const express = require("express");
const config = require("config");
const router = express.Router();
const passport = require("passport");

const cookieExpiration = config.get("cookieExpiration");

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
    res.cookie("token", req.cookies.token, {
      expires: new Date(Date.now() - cookieExpiration),
      secure: false,
      httpOnly: true,
    });
    res.json({ success: true, message: "User Logged Out" });
  })(req, res, next);
});

module.exports = router;
