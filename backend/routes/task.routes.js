const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Route pour créer une tâche
router.post('/', taskController.createTask);

// Route pour obtenir toutes les tâches
router.get('/', taskController.getAllTasks);

// Route pour obtenir une tâche par ID
router.get('/:id', taskController.getTaskById);

// Route pour mettre à jour une tâche par ID
router.put('/:id', taskController.updateTask);

// Route pour supprimer une tâche par ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
