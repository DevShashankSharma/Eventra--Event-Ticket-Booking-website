const Event = require('../models/event');

// GET /api/events - fetch all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

// GET /api/events/:id - fetch event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch event" });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
};
