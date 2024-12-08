const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  weeklySchedule: {
    type: Object,
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // ObjectId type for the user reference
    ref: 'User',  // Reference to User model
    required: true,  // Make userId required
  },
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);
