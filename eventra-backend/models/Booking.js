const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    eventId: String,
    eventName: String,
    numberOfTickets: Number,
    amount: Number,
    paymentId: String,
    orderId: String,
    status: { type: String, default: "Paid" },
    bookedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
console.log('Booking model initialized', Booking);
module.exports = Booking;