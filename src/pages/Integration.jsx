import React from 'react';
import { 
  RefreshCw, Settings, Cpu, FileText, MoreHorizontal, Globe, Server, ArrowRightLeft, 
  Play, Pause, AlertTriangle 
} from 'lucide-react';

const Integration = () => {
  // Mock Data
  const integrationInterfaces = [
    { id: 'INT-001', name: 'Sales Orders Sync', source: 'E-Commerce', target: 'SAP ERP', method: 'Webhook', freq: 'Real-time', status: 'active', lastRun: '2 mins ago' },
    { id: 'INT-002', name: 'Inventory Update', source: 'WMS', target: 'E-Commerce', method: 'Batch API', freq: 'Every 15m', status: 'active', lastRun: '10 mins ago' },
    { id: 'INT-003', name: 'Customer Master Sync', source: 'Salesforce', target: 'Data Lake', method: 'ETL Pipeline', freq: 'Daily (02:00)', status: 'paused', lastRun: '14 hours ago' },
    { id: 'INT-004', name: 'Employee Onboarding', source: 'HR Platform', target: 'Active Directory', method: 'API Trigger', freq: 'On-Event', status: 'active', lastRun: '1 day ago' },
    { id: 'INT-005', name: 'Payment Reconciliation', source: 'Bank Gateway', target: 'SAP ERP', method: 'SFTP File', freq: 'Daily (06:00)', status: 'error', lastRun: 'Failed' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Integration Hub</h1>
          <p className="text-slate-500">จัดการ Interfaces และติดตามการรับส่งข้อมูลระหว่างระบบ</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
          <RefreshCw className="w-4 h-4" />
          Refresh Status
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar (Internal Filter) */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-500" />
              Configuration
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg bg-indigo-50 text-indigo-700 font-medium">All Interfaces</button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg text-slate-600 hover:bg-slate-50">Active Only</button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg text-slate-600 hover:bg-slate-50">Errors / Warnings</button>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
               <button className="w-full border border-dashed border-slate-300 text-slate-500 hover:border-indigo-500 hover:text-indigo-600 p-3 rounded-lg text-sm flex justify-center items-center gap-2 transition-colors">
                  + New Interface
               </button>
            </div>
          </div>

          <div className="bg-slate-800 text-white p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg"><Cpu className="w-5 h-5 text-indigo-300" /></div>
              <div><h4 className="font-medium text-sm">System Load</h4></div>
            </div>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between mb-1"><span>CPU Usage</span><span>42%</span></div>
              <div className="w-full bg-slate-600 h-1.5 rounded-full"><div className="bg-indigo-400 h-full w-[42%]"></div></div>
            </div>
          </div>
        </div>

        {/* Main List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="divide-y divide-slate-100">
                {integrationInterfaces.map((intf) => (
                  <div key={intf.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${intf.status === 'active' ? 'bg-emerald-500' : intf.status === 'error' ? 'bg-red-500' : 'bg-amber-400'}`}></div>
                        <h4 className="font-semibold text-slate-800 text-lg">{intf.name}</h4>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded border border-slate-200 font-mono">{intf.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg"><FileText className="w-4 h-4" /></button>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="md:col-span-2 flex items-center gap-3 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                         <Globe className="w-4 h-4 text-slate-400" />
                         <span className="text-sm font-medium text-slate-700">{intf.source}</span>
                         <ArrowRightLeft className="w-4 h-4 text-slate-300" />
                         <Server className="w-4 h-4 text-slate-400" />
                         <span className="text-sm font-medium text-slate-700">{intf.target}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-400">Method</span>
                        <div className="text-sm text-slate-600 font-medium">{intf.method}</div>
                      </div>
                      <div className="flex items-center justify-end gap-3">
                         {intf.status === 'active' ? (
                           <span className="flex items-center gap-1 text-emerald-700 text-sm font-medium"><Play className="w-3 h-3 fill-current" /> Running</span>
                         ) : intf.status === 'error' ? (
                            <span className="flex items-center gap-1 text-red-700 text-sm font-medium"><AlertTriangle className="w-3 h-3" /> Error</span>
                         ) : (
                            <span className="flex items-center gap-1 text-amber-700 text-sm font-medium"><Pause className="w-3 h-3 fill-current" /> Paused</span>
                         )}
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;