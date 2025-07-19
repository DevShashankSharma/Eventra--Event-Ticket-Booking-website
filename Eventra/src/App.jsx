import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import EventInfo from './pages/EventInfo';
import PaymentPage from './pages/PaymentPage';
import YourBookings from './pages/YourBookings';

const event = {
  id: "EVT123",
  title: "Music Night Live",
  description: "Join us for an electrifying night of music and dance.",
  image: "/event-img.jpg",
  author: "Eventra Team",
  booked: 134,
  location: "Delhi Auditorium",
  date: "July 25, 2025",
  time: "7:00 PM",
  price: 399,
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<EventInfo />} />
          <Route path="/payment" element={<PaymentPage event={event} />} />
          <Route path="/bookings" element={<YourBookings />} />
        </Routes>
        {/* You can add a Footer or other global components here */}
      </div>
    </Router>
  );
};

export default App;
