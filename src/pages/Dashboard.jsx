import React, { useState } from 'react';
import { 
  Database, 
  Activity, 
  Server, 
  ArrowRightLeft, 
  ShieldCheck, 
  Layers, 
  Search, 
  Settings, 
  Bell, 
  User,
  Box,
  Users,
  MapPin,
  CreditCard,
  FileJson,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

const MasterHub = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock Data สำหรับแสดงผล
  const systemStatus = [
    { name: 'ERP System (SAP)', status: 'online', latency: '45ms' },
    { name: 'CRM (Salesforce)', status: 'online', latency: '120ms' },
    { name: 'E-Commerce Web', status: 'warning', latency: '450ms' },
    { name: 'Warehouse WMS', status: 'online', latency: '30ms' },
  ];

  const recentTransactions = [
    { id: 'TXN-8821', source: 'E-Commerce', target: 'ERP', type: 'Order Sync', status: 'success', time: '10:42 AM' },
    { id: 'TXN-8822', source: 'CRM', target: 'Data Lake', type: 'Cust Update', status: 'success', time: '10:40 AM' },
    { id: 'TXN-8823', source: 'WMS', target: 'ERP', type: 'Inv Adjust', status: 'failed', time: '10:35 AM' },
    { id: 'TXN-8824', source: 'HR System', target: 'Active Dir', type: 'Emp Onboard', status: 'success', time: '10:30 AM' },
  ];

  const masterDataDomains = [
    { title: 'ข้อมูลลูกค้า (Customer)', count: '14,205 Records', icon: Users, color: 'bg-blue-100 text-blue-600', update: 'Updated 2m ago' },
    { title: 'ข้อมูลสินค้า (Product)', count: '8,430 SKUs', icon: Box, color: 'bg-emerald-100 text-emerald-600', update: 'Updated 1h ago' },
    { title: 'สถานที่/สาขา (Location)', count: '125 Branches', icon: MapPin, color: 'bg-purple-100 text-purple-600', update: 'Updated 1d ago' },
    { title: 'บัญชี/การเงิน (Finance)', count: 'Active', icon: CreditCard, color: 'bg-orange-100 text-orange-600', update: 'Updated 5m ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Layers className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent">
                  MasterHub
                </span>
              </div>
              
              <div className="hidden md:flex ml-10 space-x-1">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('integration')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'integration' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  Integration Hub
                </button>
                <button 
                  onClick={() => setActiveTab('mdm')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'mdm' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  Master Data
                </button>
                <button className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50">
                  API Docs
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ค้นหา Transaction / ID..." 
                  className="pl-9 pr-4 py-1.5 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
              </div>
              <button className="relative p-2 text-slate-500 hover:text-indigo-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 cursor-pointer">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
          <p className="text-slate-500">ศูนย์กลางการเชื่อมต่อและบริหารจัดการข้อมูลองค์กร</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total API Requests</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">2.4M</h3>
                <span className="text-xs text-emerald-600 flex items-center mt-1">
                  <ArrowRightLeft className="w-3 h-3 mr-1" /> +12% จากเมื่อวาน
                </span>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Data Throughput</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">850 GB</h3>
                <span className="text-xs text-slate-500 mt-1">Usage today</span>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Server className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Master Records</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">452K</h3>
                <span className="text-xs text-emerald-600 mt-1">Sync สมบูรณ์ 100%</span>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Database className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">System Health</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">99.9%</h3>
                <span className="text-xs text-slate-500 mt-1">All Systems Operational</span>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Core Layout: Split Integration vs MDM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Integration & Logs (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Live Data Flow Monitor */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  Live Data Exchange Monitor
                </h2>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium animate-pulse">
                  Processing Live
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  {systemStatus.map((sys, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-pointer">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${sys.status === 'online' ? 'bg-slate-100 group-hover:bg-indigo-50 border-2 border-emerald-400' : 'bg-amber-50 border-2 border-amber-400'}`}>
                        <Server className={`w-6 h-6 ${sys.status === 'online' ? 'text-slate-600' : 'text-amber-600'}`} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{sys.name}</span>
                      <span className={`text-[10px] ${sys.status === 'online' ? 'text-emerald-600' : 'text-amber-600'}`}>{sys.latency}</span>
                    </div>
                  ))}
                </div>
                
                {/* Visual Connector Lines (CSS Simulation) */}
                <div className="relative h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/3 bg-indigo-500 opacity-20 animate-pulse"></div>
                  <div className="absolute top-0 left-1/3 h-full w-1/3 bg-blue-500 opacity-20 animate-pulse delay-75"></div>
                  <div className="absolute top-0 right-0 h-full w-1/3 bg-emerald-500 opacity-20 animate-pulse delay-150"></div>
                </div>

                {/* Recent Logs Table */}
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">Recent Transactions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-xs text-slate-500">
                          <th className="py-2 font-medium">Txn ID</th>
                          <th className="py-2 font-medium">From &rarr; To</th>
                          <th className="py-2 font-medium">Type</th>
                          <th className="py-2 font-medium">Status</th>
                          <th className="py-2 font-medium text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {recentTransactions.map((txn) => (
                          <tr key={txn.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                            <td className="py-3 font-mono text-slate-600">{txn.id}</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-600">{txn.source}</span>
                                <ArrowRightLeft className="w-3 h-3 text-slate-400" />
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-600">{txn.target}</span>
                              </div>
                            </td>
                            <td className="py-3 text-slate-700">{txn.type}</td>
                            <td className="py-3">
                              {txn.status === 'success' ? (
                                <span className="flex items-center text-emerald-600 text-xs font-medium">
                                  <CheckCircle className="w-3 h-3 mr-1" /> Success
                                </span>
                              ) : (
                                <span className="flex items-center text-red-600 text-xs font-medium">
                                  <AlertTriangle className="w-3 h-3 mr-1" /> Failed
                                </span>
                              )}
                            </td>
                            <td className="py-3 text-right text-slate-400 text-xs">{txn.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="w-full mt-4 text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium py-2 border border-dashed border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
                    View All Transaction Logs
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions / Tools */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg shadow-indigo-200 flex flex-col justify-between cursor-pointer hover:bg-indigo-700 transition-colors">
                  <FileJson className="w-8 h-8 mb-4 opacity-80" />
                  <div>
                    <h3 className="font-bold text-lg">API Documentation</h3>
                    <p className="text-indigo-100 text-sm opacity-80 mt-1">คู่มือการเชื่อมต่อสำหรับนักพัฒนา (Swagger/OpenAPI)</p>
                  </div>
               </div>
               <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:border-indigo-300 transition-colors">
                  <Settings className="w-8 h-8 mb-4 text-slate-400" />
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">Connection Settings</h3>
                    <p className="text-slate-500 text-sm mt-1">ตั้งค่า Endpoint และ Security Keys</p>
                  </div>
               </div>
            </div>

          </div>

          {/* Right Column: Master Data Management (1/3 width) */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 h-full">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-600" />
                  Master Data Repository
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-500 mb-4">
                  ฐานข้อมูลกลางสำหรับใช้งานร่วมกันทุกระบบ (Single Source of Truth)
                </p>

                {masterDataDomains.map((domain, idx) => (
                  <div key={idx} className="group p-4 border border-slate-100 rounded-lg hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer bg-white">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-2 rounded-lg ${domain.color}`}>
                        <domain.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center bg-slate-50 px-2 py-1 rounded-full">
                         <Clock className="w-3 h-3 mr-1" /> {domain.update}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600">{domain.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{domain.count}</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-indigo-500 h-full w-3/4"></div>
                    </div>
                  </div>
                ))}

                <button className="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-200">
                  <Database className="w-4 h-4" />
                  Manage Master Data
                </button>
              </div>
            </div>

            {/* System Notification */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100 rounded-full text-blue-600 mt-0.5">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-800">Scheduled Maintenance</h4>
                  <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                    ระบบจะทำการปรับปรุงฐานข้อมูล Product Master คืนนี้เวลา 02:00 - 04:00 น.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default MasterHub;