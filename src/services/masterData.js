import api from './api';

export const masterDataService = {
  getData: async (domain, params = {}) => {
    try {
      const endpoints = {
        'product': '/product/skus/',
        'customer': '/core/customers/',
        'brands': '/product/brands/',
        'categories': '/product/categories/', // แก้เป็น categories และใส่ URL ใหม่
        'names': '/product/names/', 
        'skus': '/product/skus/'
      };

      const url = endpoints[domain] || `/master/${domain}/`;
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${domain}:`, error);
      throw error;
    }
  },

  createData: async (domain, data) => {
    try {
      const endpoints = {
        'product': '/product/skus/',
        'brands': '/product/brands/',
        'categories': '/product/categories/', // เพิ่ม
        'names': '/product/names/',
      };
      const url = endpoints[domain] || `/master/${domain}/`;
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteData: async (domain, id) => {
    try {
      const endpoints = {
        'product': '/product/skus/',
        'brands': '/product/brands/',
        'categories': '/product/categories/', // เพิ่ม
        'names': '/product/names/',
      };
      const baseUrl = endpoints[domain] || `/master/${domain}/`;
      const url = `${baseUrl}${id}/`; 
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};