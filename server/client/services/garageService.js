import axios from 'axios';

const API_URL = 'http://localhost:5000/api/garages';

export const getGarages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching garage data', error);
  }
};

export const updateGarageAvailability = async (id, availableSpaces) => {
  try {
    const response = await axios.post(`${API_URL}/update`, { id, availableSpaces });
    return response.data;
  } catch (error) {
    console.error('Error updating garage availability', error);
  }
};
