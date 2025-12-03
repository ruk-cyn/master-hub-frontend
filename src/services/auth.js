import api from './api';

// --- 🛑 Config: ใส่ User/Pass ขาโหดตรงนี้เลย ---
const DEV_USER = "admin";  // ใส่ Username ของ Django
const DEV_PASS = "Cynbangkok@1234";   // ใส่ Password ของ Django
// ---------------------------------------------

export const authService = {
  // ฟังก์ชัน Login แบบ Dev (ไม่ต้องรับค่าจากข้างนอก)
  loginDev: async () => {
    try {
      console.log("Auto Logging in with:", DEV_USER);

      // ยิงไปขอ Token
      const response = await api.post('/token/', { 
        username: DEV_USER, 
        password: DEV_PASS 
      });

      // ถ้าได้ Token มาแล้ว ให้เก็บลงเครื่อง
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        console.log("✅ Login Success! Token saved.");
      }

      return response.data;
    } catch (error) {
      console.error("Login Failed:", error);
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