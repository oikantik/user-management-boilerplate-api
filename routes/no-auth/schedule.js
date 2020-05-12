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
      startDate: response.startDate,
      endDate: response.endDate,
      timezone: response.timezone,
      meetingLength: response.meetingLength,
      spreadLength: response.spreadLength,
      blackoutDate: response.blackoutDate,
      monday: response.availableDays.monday,
      tuesday: response.availableDays.tuesday,
      wednesday: response.availableDays.wednesday,
      thursday: response.availableDays.thursday,
      friday: response.availableDays.friday,
      saturday: response.availableDays.saturday,
      sunday: response.availableDays.sunday,
    },
  });
});

module.exports = router;
