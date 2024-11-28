const mongoose = require('mongoose');
const validator = require('validator'); // Bibliothèque pour valider l'email

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email address',
      },
    },
    password: { type: String, required: true, minlength: 6 }, // Password with minimum length
    role: {
      type: String,
      enum: ['employee', 'manager', 'admin'],
      default: 'employee',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
