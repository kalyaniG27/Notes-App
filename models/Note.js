const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  reminderAt: {
    type: Date,
    default: null
  },
  isReminderSent: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
