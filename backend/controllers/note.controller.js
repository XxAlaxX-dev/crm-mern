const Note = require('../models/note.model');
const mongoose = require('mongoose');
const User = require('../models/user.model'); // Ensure this import is added

// Create a note
exports.createNote = async (req, res) => {
  try {
    const { title, content, createdBy, relatedTo } = req.body;

    // Verify if the user exists
    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the note
    const note = new Note({
      title,
      content,
      createdBy,
      relatedTo,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all notes with populated createdBy and relatedTo
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate('createdBy', 'name email') // Populate user details
      .populate('relatedTo', 'title'); // Populate related task title
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid note ID format' });
    }

    const note = await Note.findById(id)
      .populate('createdBy', 'name email')
      .populate('relatedTo', 'title');
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a note by ID
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid note ID format' });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validators run on update
    });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a note by ID
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid note ID format' });
    }

    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
