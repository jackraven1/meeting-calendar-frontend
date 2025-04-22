import React, { useState, useContext } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MeetingContext } from '../../context/MeetingContext';
import MeetingForm from '../MeetingForm/MeetingForm';
import './MeetingCalendar.css';

const MeetingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { meetings } = useContext(MeetingContext);
  const [showForm, setShowForm] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const hasMeetings = meetings.some(meeting => 
    new Date(meeting.startTime).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="calendar-container">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar 
          value={selectedDate} 
          onChange={handleDateChange}
          disablePast
        />
      </LocalizationProvider>
      
      <div className="meetings-section">
        <h3>Meetings on {selectedDate.toDateString()}</h3>
        
        {hasMeetings ? (
          meetings
            .filter(meeting => new Date(meeting.startTime).toDateString() === selectedDate.toDateString())
            .map(meeting => (
              <div key={meeting.id} className="meeting-item">
                <p>{meeting.title}</p>
                <p>{new Date(meeting.startTime).toLocaleTimeString()} - {new Date(meeting.endTime).toLocaleTimeString()}</p>
              </div>
            ))
        ) : (
          <p>No meetings scheduled for this day</p>
        )}
        
        <button onClick={() => setShowForm(true)}>Schedule Meeting</button>
      </div>
      
      {showForm && (
        <MeetingForm 
          selectedDate={selectedDate} 
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default MeetingCalendar;