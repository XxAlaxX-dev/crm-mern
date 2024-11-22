const Meeting = require('../models/reunion.model');

// Create a meeting
exports.createMeeting = async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().populate('participants', 'name email');
    res.status(200).json(meetings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
