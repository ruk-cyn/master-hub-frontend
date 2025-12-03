import React, { useState } from 'react';
import { 
  Users, Box, MapPin, CreditCard, Search, Filter, Download, Plus, Edit2, Trash2 
} from 'lucide-react';

const MasterData = () => {
  const [selectedDomain, setSelectedDomain] = useState('product');

  const masterDataDomains = [
    { id: 'product', title: 'Product', count: '8,430', icon: Box, color: 'text-emerald-600' },
    { id: 'customer', title: 'Customer Data', count: '14,205', icon: Users, color: 'text-blue-600' },
    { id: 'location', title: 'Locations', count: '125', icon: MapPin, color: 'text-purple-600' },
    { id: 'finance', title: 'Chart of Accounts', count: 'Active', icon: CreditCard, color: 'text-orange-600' },
  ];

  const productMasterData = [
    { id: 'SKU-1001', name: 'Premium Wireless Headset', category: 'Electronics', price: '฿4,590', status: 'Active', sync: 'Synced' },
    { id: 'SKU-1002', name: 'Ergonomic Office Chair', category: 'Furniture', price: '฿8,900', status: 'Active', sync: 'Synced' },
    { id: 'SKU-1003', name: 'Mechanical Keyboard RGB', category: 'Electronics', price: '฿3,200', status: 'Draft', sync: 'Pending' },
    { id: 'SKU-1004', name: '27" 4K Monitor', category: 'Electronics', price: '฿12,500', status: 'Active', sync: 'Synced' },
  ];

  return (
    <div className="animate-fade-in flex flex-col md:flex-row gap-6 h-[calc(100vh-100px)]">
      
      {/* Sidebar (Internal) */}
      <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4">
         <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 overflow-hidden">
            <div className="p-3">
               <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Domains</h2>
               <div className="space-y-1">
                  {masterDataDomains.map(domain => (
                     <button 
                        key={domain.id}
                        onClick={() => setSelectedDomain(domain.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedDomain === domain.id ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                     >
                        <domain.icon className={`w-4 h-4 ${selectedDomain === domain.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                        {domain.title}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
         {/* Toolbar */}
         <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50/30">
            <h2 className="font-bold text-slate-800 text-lg">Product</h2>
            <div className="flex items-center gap-2">
               <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search..." className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg w-48" />
               </div>
               <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm">
                  <Plus className="w-4 h-4" /> Add
               </button>
            </div>
         </div>

         {/* Table */}
         <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
               <thead className="bg-slate-50 sticky top-0 z-10">
                  <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                     <th className="px-6 py-3 border-b border-slate-100">SKU</th>
                     <th className="px-6 py-3 border-b border-slate-100">Name</th>
                     <th className="px-6 py-3 border-b border-slate-100">Category</th>
                     <th className="px-6 py-3 border-b border-slate-100 text-right">Price</th>
                     <th className="px-6 py-3 border-b border-slate-100 text-center">Status</th>
                     <th className="px-6 py-3 border-b border-slate-100 w-10"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {productMasterData.map((item, idx) => (
                     <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 text-sm font-mono text-slate-600">{item.id}</td>
                        <td className="px-6 py-3 text-sm font-medium text-slate-800">{item.name}</td>
                        <td className="px-6 py-3 text-sm text-slate-600">{item.category}</td>
                        <td className="px-6 py-3 text-sm text-slate-700 text-right">{item.price}</td>
                        <td className="px-6 py-3 text-center">
                           <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span>
                        </td>
                        <td className="px-6 py-3 text-right">
                           <button className="text-slate-400 hover:text-indigo-600"><Edit2 className="w-4 h-4" /></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default MasterData;