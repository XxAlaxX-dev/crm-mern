const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation: Vérifier si l'email est déjà pris
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Send the user details (avoid sending password)
    const userWithoutPassword = { ...user.toObject(), password: undefined };

    res.status(201).json({
      succes:true,
      msg:"User created Succefully",
      userWithoutPassword
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation: Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY_JWT,
      { expiresIn: '1h' }
    );

    res.status(200).json({ succes:true,msg:"User Logged Succefully",token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from the result
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure admin cannot delete themselves
    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: "You cannot delete your own account." });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
