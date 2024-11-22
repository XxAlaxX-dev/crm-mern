const express = require('express');
const router = express.Router();
const reunionController = require('../controllers/reunion.controller');

router.post('/', reunionController.createMeeting);
router.get('/', reunionController.getAllMeetings);

module.exports = router;
