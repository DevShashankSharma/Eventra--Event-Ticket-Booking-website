const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    time: String,
    description: String,
    image: String,
    type: String,
    category: String,
    price: Number,
    host: String,
    badge: String,
    mode: String,
    location: String,
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

module.exports = Event;