const express = require('express');
const router = express.Router();
const {
    createOrder,
    verifyPayment,
    getUserBookings,
    getAllBookings
} = require('../controllers/bookingController');

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/my-bookings', getUserBookings);
router.get('/all-bookings', getAllBookings); // admin endpoint

module.exports = router;
