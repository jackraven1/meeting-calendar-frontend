import api from './api';

const meetingService = {
  getAllMeetings: async () => {
    try {
      const response = await api.get('/meetings');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch meetings');
    }
  },
  
  createMeeting: async (meetingData) => {
    try {
      const response = await api.post('/meetings', meetingData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create meeting');
    }
  },
  
  updateMeeting: async (id, meetingData) => {
    try {
      const response = await api.put(`/meetings/${id}`, meetingData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update meeting');
    }
  },
  
  deleteMeeting: async (id) => {
    try {
      await api.delete(`/meetings/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete meeting');
    }
  }
};

export default meetingService;