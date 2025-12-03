import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Layers, Search, Bell, User, LogOut, LayoutDashboard, Network, Database, FileText } from 'lucide-react';

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    // เปลี่ยนจาก flex-row เป็น flex-col เพื่อให้ Topbar อยู่บน และเนื้อหาอยู่ล่างเต็มจอ
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* --- Top Navigation Bar --- */}
      <nav className="bg-white border-b border-slate-200 h-16 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          
          {/* 1. Logo & Menu Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Layers className="text-white w-5 h-5" />
               </div>
               <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent hidden md:block">
                  NexusCore
               </span>
            </div>

            {/* Menu Links (ย้ายมาจาก Sidebar) */}
            <div className="hidden md:flex items-center space-x-1">
              <TopNavLink to="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />
              <TopNavLink to="/integration" icon={<Network size={18} />} text="Integration" />
              <TopNavLink to="/master-data" icon={<Database size={18} />} text="Master Data" />
              <TopNavLink to="/api-docs" icon={<FileText size={18} />} text="API Docs" />
            </div>
          </div>

          {/* 2. Right Icons & Profile */}
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="ค้นหา..." 
                className="pl-9 pr-4 py-1.5 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 transition-all"
              />
            </div>
            
            <button className="relative p-2 text-slate-500 hover:text-indigo-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-200 mx-1"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-700">Admin User</p>
                <p className="text-xs text-slate-500">System Admin</p>
              </div>
              <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm cursor-pointer">
                <User className="w-5 h-5" />
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                title="ออกจากระบบ"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Dynamic Content Area --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 animate-fade-in">
        <Outlet />
      </main>

    </div>
  );
};

// Component ย่อยสำหรับลิงก์บน Topbar
const TopNavLink = ({ to, icon, text }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
      }`
    }
  >
    {icon}
    <span>{text}</span>
  </NavLink>
);

export default MainLayout;