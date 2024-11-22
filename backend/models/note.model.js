const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  relatedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Optional relation to Task
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
