const express = require('express');
const router = express.Router();
const reunionController = require('../controllers/reunion.controller');

// Route pour créer une réunion
router.post('/', reunionController.createMeeting);

// Route pour obtenir toutes les réunions
router.get('/', reunionController.getAllMeetings);

// Route pour obtenir une réunion par ID
router.get('/:id', reunionController.getMeetingById);

// Route pour mettre à jour une réunion par ID
router.put('/:id', reunionController.updateMeeting);

// Route pour supprimer une réunion par ID
router.delete('/:id', reunionController.deleteMeeting);

module.exports = router;
