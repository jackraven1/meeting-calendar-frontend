import React, { useContext } from 'react';
import { MeetingContext } from '../context/MeetingContext';
import './MeetingHistory.css';

const MeetingHistory = () => {
  const { meetings, loading, error, deleteMeeting } = useContext(MeetingContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="meeting-history">
      <h1>Meeting History</h1>
      <div className="meetings-list">
        {meetings.map(meeting => (
          <div key={meeting.id} className="meeting-card">
            <h3>{meeting.title}</h3>
            <p>{new Date(meeting.startTime).toLocaleString()} - {new Date(meeting.endTime).toLocaleString()}</p>
            <p>Room: {meeting.meetingRoom}</p>
            <p>Participants: {meeting.participants.join(', ')}</p>
            <button onClick={() => deleteMeeting(meeting.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingHistory;