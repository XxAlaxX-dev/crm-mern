const Meeting = require("../models/reunion.model");
const mongoose = require('mongoose');

// Create a meeting
exports.createMeeting = async (req, res) => {
  try {
    const { title, description, date, participants, createdBy } = req.body;

    // Vérifier si le créateur (createdBy) existe
    if (!createdBy) {
      return res
        .status(400)
        .json({ error: "Creator (createdBy) is required." });
    }

    const meeting = new Meeting({
      title,
      description,
      date,
      participants,
      createdBy,
    });

    await meeting.save();
    res.status(201).json({
      succes: true,
      msg: "Meeting created Succefully",
      meeting: meeting,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("participants", "name email")
      .populate("createdBy", "name email");
    res.status(200).json({
      succes: true,
      msg: "Getting all Meeting  Succefully",
      meetings: meetings,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid note ID format" });
    }
    const meeting = await Meeting.findById(req.params.id)
      .populate("participants", "name email")
      .populate("createdBy", "name email");

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    res.status(200).json({
      succes: true,
      msg: "Getting The Meeting  Succefully",
      meeting: meeting,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a meeting by ID
exports.updateMeeting = async (req, res) => {
  try {
    const { title, description, date, participants, createdBy } = req.body;

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { title, description, date, participants, createdBy },
      { new: true, runValidators: true }
    );

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    res.status(200).json({
      succes:true,
      msg:"The Meeting Updated Succefully",
      meeting: meeting,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a meeting by ID
exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
