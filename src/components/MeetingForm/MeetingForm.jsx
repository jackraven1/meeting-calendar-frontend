import React, { useState, useContext } from 'react';
import { MeetingContext } from '../../context/MeetingContext';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './MeetingForm.css';

const MeetingForm = ({ selectedDate, onClose }) => {
  const { addMeeting } = useContext(MeetingContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: selectedDate,
    endTime: new Date(selectedDate.getTime() + 30 * 60000), // Default 30 min meeting
    participants: '',
    meetingRoom: 'Conference Room A'
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.startTime >= formData.endTime) newErrors.endTime = 'End time must be after start time';
    if (new Date(formData.startTime) < new Date()) newErrors.startTime = 'Meeting cannot be in the past';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addMeeting({
        ...formData,
        participants: formData.participants.split(',').map(p => p.trim())
      });
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <Typography variant="h5">Schedule New Meeting</Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title}
            required
          />
          
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Start Time"
              value={formData.startTime}
              onChange={(newValue) => setFormData(prev => ({ ...prev, startTime: newValue }))}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  margin="normal"
                  error={!!errors.startTime}
                  helperText={errors.startTime}
                />
              )}
            />
            
            <DateTimePicker
              label="End Time"
              value={formData.endTime}
              onChange={(newValue) => setFormData(prev => ({ ...prev, endTime: newValue }))}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  margin="normal"
                  error={!!errors.endTime}
                  helperText={errors.endTime}
                />
              )}
            />
          </LocalizationProvider>
          
          <TextField
            label="Participants (comma separated)"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          <TextField
            select
            label="Meeting Room"
            name="meetingRoom"
            value={formData.meetingRoom}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {['Conference Room A', 'Conference Room B', 'Conference Room C', 'Virtual Meeting'].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Schedule Meeting
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default MeetingForm;