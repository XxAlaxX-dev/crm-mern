const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');

// Routes for Notes
router.post('/', noteController.createNote); // Create a new note
router.get('/', noteController.getAllNotes); // Get all notes
router.get('/:id', noteController.getNoteById); // Get a note by ID
router.put('/:id', noteController.updateNote); // Update a note by ID
router.delete('/:id', noteController.deleteNote); // Delete a note by ID

module.exports = router;
