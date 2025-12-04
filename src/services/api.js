import axios from 'axios';

// 1. ตั้งค่า Base URL
const api = axios.create({
  baseURL: 'https://api-test.cynlive.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor (ด่านขาออก: แนบ Token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- [เพิ่มส่วนนี้ครับ] ---
// 3. Response Interceptor (ด่านขาเข้า: ดักจับ Error 401)
api.interceptors.response.use(
  (response) => {
    // ถ้า API ตอบกลับมาปกติ (200, 201) ให้ผ่านไปได้เลย
    return response;
  },
  (error) => {
    // ถ้ามี Error เกิดขึ้น
    if (error.response && error.response.status === 401) {
      // ตรวจสอบว่าเป็น 401 Unauthorized หรือไม่
      console.warn('Session Expired: Logging out...');

      // 1. ล้าง Token ออกจากเครื่อง
      localStorage.clear(); 
      // หรือถ้าอยากลบเฉพาะตัว: 
      // localStorage.removeItem('access_token');
      // localStorage.removeItem('refresh_token');

      // 2. บังคับ Redirect ไปหน้า Login (/)
      // ใช้ window.location เพื่อให้หน้าเว็บโหลดใหม่และเคลียร์ State ทั้งหมด
      window.location.href = '/';
    }

    // ส่ง Error ต่อไปให้ Component เผื่อจะจัดการอย่างอื่น (เช่น ปิด Loading)
    return Promise.reject(error);
  }
);
// -----------------------

export default api;