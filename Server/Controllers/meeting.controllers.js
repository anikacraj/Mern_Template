const Meeting = require('../Models/Meeting');
const mongoose = require('mongoose');

// Helper function to generate a unique page URL
function generateUniquePageUrl() {
  return `https://meetingurl.com/${Math.random().toString(36).substr(2, 9)}`;
}

exports.CreateMeeting = async (req, res) => {
  const { userId } = req.params;  // userId passed in URL
  console.log('Received request body:', req.body);
  console.log('Received userId:', userId);  // Logging the userId

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    const { weeklySchedule, timeZone } = req.body;

    if (!weeklySchedule || typeof weeklySchedule !== 'object' || !Object.keys(weeklySchedule).length) {
      return res.status(400).json({ error: 'weeklySchedule is required and should contain at least one day' });
    }

    const hasSchedule = Object.values(weeklySchedule).some((day) => Array.isArray(day) && day.length > 0);
    if (!hasSchedule) {
      return res.status(400).json({ error: 'At least one day must have a schedule' });
    }

    if (!timeZone) {
      return res.status(400).json({ error: 'TimeZone is required' });
    }

    // Generate a unique page URL
    const pageUrl = generateUniquePageUrl();

    // Save the meeting to the database with the userId
    const newMeeting = new Meeting({
      weeklySchedule,
      timeZone,
      pageUrl,
      userId: mongoose.Types.ObjectId(userId),  // Ensure userId is ObjectId
    });

    const savedMeeting = await newMeeting.save();

    res.status(201).json({
      message: 'Meeting created successfully',
      pageUrl,
    });
  } catch (error) {
    console.error('Error creating meeting:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create meeting' });
  }
};

exports.getMeetingData = async (req, res) => {
  const userId = req.params.userId;
  
  console.log('Received userId:', userId);

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    // Fetch meetings for the given userId
    const meetings = await Meeting.find({ userId });

    if (meetings.length === 0) {
      return res.status(404).json({ error: 'No meetings found for this user' });
    }

    res.json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
};
