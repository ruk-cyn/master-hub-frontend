// src/components/Sidebar.jsx
import React from 'react';
import { LayoutDashboard, Package, Settings, LogOut, FileText, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-xl h-screen">
      <div className="p-6 text-2xl font-bold border-b border-indigo-800 flex items-center gap-2">
        <Package /> Master Hub
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <MenuLink icon={<LayoutDashboard size={20} />} text="ภาพรวม" active />
        <MenuLink icon={<Package size={20} />} text="จัดการสินค้า" />
        <MenuLink icon={<FileText size={20} />} text="รายงาน" />
        <MenuLink icon={<Users size={20} />} text="พนักงาน" />
        <MenuLink icon={<Settings size={20} />} text="ตั้งค่า" />
      </nav>

      <div className="p-4 border-t border-indigo-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors w-full p-2 rounded-lg hover:bg-indigo-800 cursor-pointer"
        >
          <LogOut size={20} /> ออกจากระบบ
        </button>
      </div>
    </aside>
  );
};

// Component ย่อย ไว้ใช้ภายในไฟล์นี้
const MenuLink = ({ icon, text, active }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'}`}>
    {icon}
    <span className="font-medium">{text}</span>
  </a>
);

export default Sidebar;