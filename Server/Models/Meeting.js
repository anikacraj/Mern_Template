// models/Meeting.js
const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});

const MeetingSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  schedules: {
    type: [ScheduleSchema],
    required: true,
  },
  timeZone: {
    type: String,
    required: true,
  },
  pageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Meeting", MeetingSchema);
