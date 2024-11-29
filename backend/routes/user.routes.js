const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middelwares/authorize');

// Public Routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected Routes
router.get('/', authenticate, authorize(['admin', 'manager']), userController.getAllUsers);
router.delete('/:id', authenticate, authorize(['admin']), userController.deleteUser);

module.exports = router;
