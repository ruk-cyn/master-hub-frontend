import api from './api';

export const masterDataService = {
  // ฟังก์ชันดึงข้อมูลตามประเภท (domain)
  // ตัวอย่าง: getData('product') -> GET /api/master/products/
  getData: async (domain, params = {}) => {
    try {
      // Mapping ชื่อ Domain ให้ตรงกับ URL ของ Backend Django
      // คุณอาจต้องแก้ URL ตรงนี้ให้ตรงกับที่ Backend ตั้งไว้
      const endpoints = {
        'product': '/product/skus/',       // หรือ /api/products/
        'customer': '/core/customers/',    // หรือ /api/customers/
        'company': '/core/companies/',     // ดึงข้อมูลบริษัท
        'location': '/core/locations/',
        'brand': '/product/brands/',       // ดึงยี่ห้อ
        'category': '/product/categorys/', // ดึงหมวดหมู่
      };

      const url = endpoints[domain] || `/master/${domain}/`;
      
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${domain}:`, error);
      throw error;
    }
  },

  // ฟังก์ชันสร้างข้อมูลใหม่ (Create)
  createData: async (domain, data) => {
    try {
      const endpoints = {
        'product': '/product/skus/',
        // ... เพิ่มตามต้องการ
      };
      const url = endpoints[domain];
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};