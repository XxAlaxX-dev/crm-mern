const Note = require('../models/note.model');

// Create a note
exports.createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('createdBy', 'name email');
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
