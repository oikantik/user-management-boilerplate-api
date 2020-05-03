const express = require("express");
const router = express.Router();
const passport = require("passport");
const { v1: uuid1 } = require("uuid");
const EventModel = require("../../models/Event");

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
    return res.status(200).json({
      success: true,
      message: "route for creating events",
    });
  })(req, res, next);
});

router.post("/create", (req, res, next) => {
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
    const { title, description, eventId } = req.body.data;
    const editorId = uuid1();
    const event = new EventModel({
      title,
      description,
      eventId,
      editorId,
      user,
    });
    const response = await event.save();
    return res.status(200).json({
      success: true,
      message: "route for creating events",
      event: response,
    });
  })(req, res, next);
});

router.post("/get-one/details", (req, res, next) => {
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
    const { editorId } = req.body.data;
    const response = await EventModel.findOne({ editorId });
    return res.status(200).json({
      success: true,
      message: "route for creating events",
      event: response,
    });
  })(req, res, next);
});

router.post("/update/details", (req, res, next) => {
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
    const { title, description, eventId, editorId } = req.body.data;
    const response = await EventModel.findOneAndUpdate(
      { editorId },
      { title, description, eventId },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "route for creating events",
      event: response,
    });
  })(req, res, next);
});

module.exports = router;
