const dotenv = require('dotenv');
dotenv.config(); // <-- Move this to the top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log('Starting Eventra Backend...', process.env.MONGO_URI);
const bookingRoutes = require('./routes/bookingRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes); 
app.use('/api/events', eventRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
.catch(err => console.log(err));
