import React from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  ShieldCheck, 
  ArrowRightLeft, 
  CheckCircle, 
  AlertTriangle,
  FileJson,
  Settings
} from 'lucide-react';

const Dashboard = () => {
  // --- ข้อมูลจำลอง (Mock Data) ---
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

  return (
    <div className="animate-fade-in">
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

      {/* Main Content: Logs & Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Logs (2/3 width) */}
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
              
              {/* Visual Connector Lines */}
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
        </div>

        {/* Right Column: Quick Info (1/3 width) */}
        <div className="space-y-8">
           {/* Quick Actions */}
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:border-indigo-300 transition-colors">
              <Settings className="w-8 h-8 mb-4 text-slate-400" />
              <div>
                <h3 className="font-bold text-lg text-slate-800">Connection Settings</h3>
                <p className="text-slate-500 text-sm mt-1">ตั้งค่า Endpoint และ Security Keys</p>
              </div>
           </div>

           <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg shadow-indigo-200 flex flex-col justify-between cursor-pointer hover:bg-indigo-700 transition-colors">
              <FileJson className="w-8 h-8 mb-4 opacity-80" />
              <div>
                <h3 className="font-bold text-lg">API Documentation</h3>
                <p className="text-indigo-100 text-sm opacity-80 mt-1">คู่มือการเชื่อมต่อสำหรับนักพัฒนา (Swagger/OpenAPI)</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;