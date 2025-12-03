import api from './api';

export const inventoryService = {
  // ดึงข้อมูลตารางสินค้า
  getProducts: async () => {
    try {
      // ยิงไปที่ http://127.0.0.1:8000/api/inventory/table/
      // Header Authorization: Bearer ... จะถูกใส่มาเองอัตโนมัติ
      const response = await api.get('/inventory/table/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // (ตัวอย่าง) ถ้ามี API สร้างสินค้าก็เพิ่มตรงนี้ได้
  // createProduct: async (data) => { ... }
};