import api from './api';

export const authService = {
  // Register User
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login User
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout User
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Get Current User
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};