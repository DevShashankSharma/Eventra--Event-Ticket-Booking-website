import React, { useEffect } from 'react';
import Events from '../components/Events';
import BookingForm from '../components/BookingForm';
import EventraDescription from '../components/EventraDescription';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // or use 'auto'
  }, [pathname]);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto  ">
        
      <EventraDescription />
      <Events />
      </div>
    </div>
  );
};

export default Home;
