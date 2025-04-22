import React, { createContext, useState, useEffect } from "react";
import meetingService from "../services/meetingService";

export const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await meetingService.getAllMeetings();
        setMeetings(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const addMeeting = async (meeting) => {
    try {
      const newMeeting = await meetingService.createMeeting(meeting);
      setMeetings((prev) => [...prev, newMeeting]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateMeeting = async (id, updatedMeeting) => {
    try {
      const updated = await meetingService.updateMeeting(id, updatedMeeting);
      setMeetings((prev) =>
        prev.map((meeting) => (meeting.id === id ? updated : meeting))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteMeeting = async (id) => {
    try {
      await meetingService.deleteMeeting(id);
      setMeetings((prev) => prev.filter((meeting) => meeting.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <MeetingContext.Provider
      value={{
        meetings,
        loading,
        error,
        addMeeting,
        updateMeeting,
        deleteMeeting,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};
