const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route pour enregistrer un nouvel utilisateur
router.post('/register', userController.register);

// Route pour connecter un utilisateur (login)
router.post('/login', userController.login);

// Route pour obtenir tous les utilisateurs (sans leur mot de passe)
router.get('/', userController.getAllUsers);

module.exports = router;
