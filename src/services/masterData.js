import api from './api';

export const masterDataService = {
  getData: async (domain, params = {}) => {
    try {
      const endpoints = {
        'product': '/product/skus/',
        'customer': '/core/customers/',
        'brands': '/product/brands/',
        'categories': '/product/categories/',
        'names': '/product/names/', 
        'skus': '/product/skus/',
        'serials': '/product/serials/' // [เพิ่มใหม่]
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
        'categories': '/product/categories/',
        'names': '/product/names/',
        'skus': '/product/skus/',
        'serials': '/product/serials/', // [เพิ่มใหม่]
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
        'categories': '/product/categories/',
        'names': '/product/names/',
        'skus': '/product/skus/',
        'serials': '/product/serials/', // [เพิ่มใหม่]
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