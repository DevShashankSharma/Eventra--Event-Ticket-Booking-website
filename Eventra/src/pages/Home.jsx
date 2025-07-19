import React from 'react';
import Events from '../components/Events';
import BookingForm from '../components/BookingForm';
import EventraDescription from '../components/EventraDescription';

const Home = () => {
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
