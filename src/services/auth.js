import api from './api';

export const authService = {
  // 1. ฟังก์ชัน Login ของจริง (รับค่าจากหน้าเว็บ)
  login: async (username, password) => {
    try {
      const response = await api.post('/token/', { 
        username, 
        password 
      });

      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  }
};