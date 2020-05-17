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
  formFields: {
    name: {
      label: {
        type: String,
        default: "Name",
      },
      isRequired: {
        type: Boolean,
        default: false,
      },
      isShown: {
        type: Boolean,
        default: false,
      },
      fieldName: {
        type: String,
        default: "name",
      },
      fieldType: {
        type: String,
        default: "text",
      },
    },
    email: {
      label: {
        type: String,
        default: "Email",
      },
      isRequired: {
        type: Boolean,
        default: true,
      },
      isShown: {
        type: Boolean,
        default: true,
      },
      fieldName: {
        type: String,
        default: "email",
      },
      fieldType: {
        type: String,
        default: "email",
      },
    },
    phone: {
      label: {
        type: String,
        default: "Phone",
      },
      isRequired: {
        type: Boolean,
        default: false,
      },
      isShown: {
        type: Boolean,
        default: false,
      },
      fieldName: {
        type: String,
        default: "phone",
      },
      fieldType: {
        type: String,
        default: "text",
      },
    },

    note: {
      label: {
        type: String,
        default: "Your Note",
      },
      isRequired: {
        type: Boolean,
        default: false,
      },
      isShown: {
        type: Boolean,
        default: false,
      },
      fieldName: {
        type: String,
        default: "note",
      },
      fieldType: {
        type: String,
        default: "text",
      },
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("events", EventSchema);
