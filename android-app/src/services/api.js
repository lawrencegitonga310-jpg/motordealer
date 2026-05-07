import axios from 'axios';

export const API_BASE_URL = 'https://gitongalawrence.alwaysdata.net/api';
export const IMAGE_BASE_URL = 'https://gitongalawrence.alwaysdata.net/static/images';

// API endpoints
export const endpoints = {
  signin: '/signin',
  signup: '/signup',
  getProducts: '/get_products',
  addBooking: '/add_booking',
  getBookings: '/get_bookings',
};

// API functions
export const api = {
  // Authentication
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoints.signin}`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoints.signup}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cars
  getCars: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoints.getProducts}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Bookings
  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoints.addBooking}`, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUserBookings: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoints.getBookings}?user_id=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Error handling
export const handleApiError = (error, navigation) => {
  console.error('API Error:', error);
  
  if (error.response?.status === 401) {
    navigation.navigate('Auth');
  } else if (error.response?.status === 500) {
    Alert.alert('Server Error', 'Something went wrong. Please try again later.');
  } else {
    Alert.alert('Error', error.message || 'An unexpected error occurred.');
  }
};
