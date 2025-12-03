import React from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  ShieldCheck, 
  ArrowRightLeft, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';

const Dashboard = () => {
  // Mock Data
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
    <div className="animate-fade-in space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
        <p className="text-slate-500">ภาพรวมสถานะระบบและการเชื่อมต่อทั้งหมด</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Total API Requests" 
          value="2.4M" 
          subtext="+12% จากเมื่อวาน" 
          icon={<Activity className="w-6 h-6 text-blue-600" />} 
          bg="bg-blue-50" 
        />
        <StatCard 
          title="Data Throughput" 
          value="850 GB" 
          subtext="Usage today" 
          icon={<Server className="w-6 h-6 text-purple-600" />} 
          bg="bg-purple-50" 
        />
        <StatCard 
          title="Master Records" 
          value="452K" 
          subtext="Sync สมบูรณ์ 100%" 
          icon={<Database className="w-6 h-6 text-emerald-600" />} 
          bg="bg-emerald-50" 
        />
        <StatCard 
          title="System Health" 
          value="99.9%" 
          subtext="All Systems Operational" 
          icon={<ShieldCheck className="w-6 h-6 text-emerald-600" />} 
          bg="bg-emerald-50" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Monitor */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                Live Data Exchange Monitor
              </h2>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium animate-pulse">
                Live
              </span>
            </div>
            
            <div className="p-6">
              {/* System Nodes */}
              <div className="flex items-center justify-between mb-8 overflow-x-auto gap-4">
                {systemStatus.map((sys, idx) => (
                  <div key={idx} className="flex flex-col items-center min-w-[80px]">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 ${sys.status === 'online' ? 'bg-slate-50 border-emerald-400' : 'bg-amber-50 border-amber-400'}`}>
                      <Server className={`w-6 h-6 ${sys.status === 'online' ? 'text-slate-600' : 'text-amber-600'}`} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 text-center">{sys.name}</span>
                    <span className="text-[10px] text-slate-400">{sys.latency}</span>
                  </div>
                ))}
              </div>

              {/* Transactions Table */}
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">Recent Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs text-slate-500">
                        <th className="py-2">Txn ID</th>
                        <th className="py-2">Source &rarr; Target</th>
                        <th className="py-2">Type</th>
                        <th className="py-2">Status</th>
                        <th className="py-2 text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {recentTransactions.map((txn) => (
                        <tr key={txn.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="py-3 font-mono text-slate-600">{txn.id}</td>
                          <td className="py-3">
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-600 mr-1">{txn.source}</span>
                            <span className="text-slate-400 text-xs">→</span>
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-600 ml-1">{txn.target}</span>
                          </td>
                          <td className="py-3 text-slate-700">{txn.type}</td>
                          <td className="py-3">
                            {txn.status === 'success' ? (
                              <span className="flex items-center text-emerald-600 text-xs font-medium"><CheckCircle className="w-3 h-3 mr-1" /> Success</span>
                            ) : (
                              <span className="flex items-center text-red-600 text-xs font-medium"><AlertTriangle className="w-3 h-3 mr-1" /> Failed</span>
                            )}
                          </td>
                          <td className="py-3 text-right text-slate-400 text-xs">{txn.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Alerts (Placeholder) */}
        <div className="space-y-6">
           <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-2">System Status</h3>
              <p className="text-indigo-200 text-sm mb-4">All systems are running smoothly. No critical alerts.</p>
              <div className="w-full bg-indigo-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[98%]"></div>
              </div>
              <div className="mt-2 text-right text-xs text-emerald-300">Uptime 99.98%</div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Component ย่อยสำหรับการ์ด
const StatCard = ({ title, value, subtext, icon, bg }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
        <p className="text-xs text-slate-400 mt-1">{subtext}</p>
      </div>
      <div className={`p-2 rounded-lg ${bg}`}>{icon}</div>
    </div>
  </div>
);

export default Dashboard;