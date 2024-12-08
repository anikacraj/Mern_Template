const Meeting = require('../Models/Meeting');  // Correct import

const CreateMeeting = async (req, res) => {
  try {
    const { day, schedules, timeZone, pageUrl } = req.body;

    if (!day || !schedules || !timeZone || !pageUrl) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMeeting = new Meeting({
      day,
      schedules,
      timeZone,
      pageUrl,
    });

    await newMeeting.save();
    res.status(201).json({ message: "Meeting saved successfully!", meeting: newMeeting });
  } catch (error) {
    console.error("Error saving meeting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { CreateMeeting };
