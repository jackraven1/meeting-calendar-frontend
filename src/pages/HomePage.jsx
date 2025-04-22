import React from 'react';
import MeetingCalendar from '../components/MeetingCalendar/MeetingCalendar';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Meeting Scheduler</h1>
      <MeetingCalendar />
    </div>
  );
};

export default HomePage;