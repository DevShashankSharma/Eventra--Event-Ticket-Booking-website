const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    const { amount } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_order_${Math.random().toString().slice(2, 10)}`,
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Order creation failed', error });
    }
};

exports.verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        bookingDetails,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        const newBooking = new Booking({
            ...bookingDetails,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
        });

        await newBooking.save();
        res.json({ success: true, message: "Payment verified and booking saved" });
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
    }
};

exports.getUserBookings = async (req, res) => {
    const { email } = req.query;
    const bookings = await Booking.find({ email });
    res.json(bookings);
};

exports.getAllBookings = async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
};
