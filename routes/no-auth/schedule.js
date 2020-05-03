const express = require("express");
const router = express.Router();
const EventModel = require("../../models/Event");

router.post("/schedule", async (req, res) => {
  const { eventId } = req.body.data;
  const response = await EventModel.findOne({ eventId });
  return res.status(200).json({
    success: true,
    message: "route for creating events",
    event: {
      title: response.title,
      description: response.description,
      eventId: response.eventId,
    },
  });
});

module.exports = router;
