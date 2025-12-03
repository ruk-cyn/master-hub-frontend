import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { inventoryService } from '../services/inventory';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await inventoryService.getProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("ไม่สามารถเชื่อมต่อกับ Server ได้");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusStyle = (status) => {
    if (status === 'instock') return 'bg-green-100 text-green-700';
    if (status === 'sold') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-6 flex justify-between items-center z-10">
          <h1 className="text-2xl font-bold text-gray-800">รายการสินค้าคงคลัง</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Admin User</span>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
              AU
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Loader2 className="animate-spin mb-2" size={40} />
              <p>กำลังโหลดข้อมูลสินค้า...</p>
            </div>
          ) : error ? (
            <div className="text-center p-10 text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                    <th className="p-4 font-semibold">ชื่อสินค้า</th>
                    <th className="p-4 font-semibold">SKU</th>
                    <th className="p-4 font-semibold">Serial</th>
                    <th className="p-4 font-semibold text-center">Company</th>
                    <th className="p-4 font-semibold text-center">Qty (จริง)</th>
                    <th className="p-4 font-semibold text-center">Qty (Odoo)</th>
                    <th className="p-4 font-semibold text-center">Qty (บัญชี)</th>
                    <th className="p-4 font-semibold text-center">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {products.map((item) => {
                    // เช็คว่าเลขตรงกับ Qty จริงไหม
                    const isOdooMatch = item.qty_odoo === item.qty_real;
                    const isAccMatch = item.qty_account === item.qty_real;

                    return (
                      <tr key={item.serial_id} className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                        <td className="p-4 font-medium">{item.product_name}</td>
                        <td className="p-4 text-gray-500">{item.sku_code}</td>
                        <td className="p-4 text-gray-500 font-mono">{item.serial_number}</td>
                        
                        {/* Company */}
                        <td className="p-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            item.company_name === 'CYN' ? 'bg-blue-100 text-blue-700' : 
                            item.company_name === 'JRP' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.company_name}
                          </span>
                        </td>

                        {/* Qty Real (เป็นตัวตั้งหลัก) */}
                        <td className="p-4 text-center font-bold text-gray-800">{item.qty_real}</td>

                        {/* Qty Odoo (ถ้าไม่ตรง ให้เป็นสีแดง) */}
                        <td className={`p-4 text-center font-medium ${isOdooMatch ? 'text-gray-600' : 'text-red-600 bg-red-50'}`}>
                          {item.qty_odoo}
                        </td>

                        {/* Qty Account (ถ้าไม่ตรง ให้เป็นสีแดง) */}
                        <td className={`p-4 text-center font-medium ${isAccMatch ? 'text-gray-600' : 'text-red-600 bg-red-50'}`}>
                          {item.qty_account}
                        </td>
                        
                        {/* Status (โชว์ตามจริงเสมอ ไม่สนใจเรื่องเลขไม่ตรง) */}
                        <td className="p-4 text-center">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusStyle(item.status)}`}>
                             {item.status}
                           </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
          © 2025 Master Hub System. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;