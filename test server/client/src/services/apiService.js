import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your API base URL

export const getParkingAvailability = async () => {
  try {
    const response = await axios.get(`${API_URL}/parking-availability`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parking data:', error);
    throw error;
  }
};
