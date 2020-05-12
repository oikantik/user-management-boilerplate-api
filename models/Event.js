const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  editorId: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  timezone: {
    type: String,
  },
  meetingLength: {
    type: Array,
  },
  spreadLength: {
    type: String,
  },
  blackoutDate: {
    type: Array,
  },
  availableDays: {
    monday: {
      type: Array,
    },
    tuesday: {
      type: Array,
    },
    wednesday: {
      type: Array,
    },
    thursday: {
      type: Array,
    },
    friday: {
      type: Array,
    },
    saturday: {
      type: Array,
    },
    sunday: {
      type: Array,
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("events", EventSchema);
