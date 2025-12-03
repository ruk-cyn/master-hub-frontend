import axios from 'axios';

// 1. ตั้งค่า Base URL
const api = axios.create({
  baseURL: 'https://api-test.cynlive.com/api', // ไม่ต้องใส่ /token/ หรือ /table/ ตรงนี้ เอาแค่ path หลัก
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. สร้าง Interceptor (ด่านตรวจ)
// ทุกครั้งที่จะยิง Request ออกไป ให้ทำฟังก์ชันนี้ก่อน
api.interceptors.request.use(
  (config) => {
    // ดึง Token จาก LocalStorage
    const token = localStorage.getItem('access_token');
    
    // ถ้ามี Token ให้ใส่เข้าไปใน Header: Authorization: Bearer xxxxx
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;