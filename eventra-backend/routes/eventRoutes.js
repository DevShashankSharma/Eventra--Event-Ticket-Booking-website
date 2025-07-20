const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById } = require('../controllers/eventController');

// Route: GET /api/events
router.get('/', getAllEvents);
router.get('/:id', getEventById);

module.exports = router;
