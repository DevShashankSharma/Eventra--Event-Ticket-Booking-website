import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import EventInfo from './pages/EventInfo';
import PaymentPage from './pages/PaymentPage';
import YourBookings from './pages/YourBookings';

const App = () => {
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventInfo />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/bookings" element={<YourBookings />} />
        </Routes>
        {/* You can add a Footer or other global components here */}
      </div>
    </Router>
  );
};

export default App;
