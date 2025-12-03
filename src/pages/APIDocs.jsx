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
  Clock,
  Play,
  Pause,
  RefreshCw,
  MoreHorizontal,
  Globe,
  Cpu,
  FileText,
  Filter,
  Download,
  Upload,
  Plus,
  Edit2,
  Trash2,
  BarChart3,
  Code,
  Copy,
  Terminal,
  ChevronRight,
  Lock
} from 'lucide-react';

const NexusHub = () => {
  const [activeTab, setActiveTab] = useState('api-docs'); // Default to api-docs for demo
  const [selectedDomain, setSelectedDomain] = useState('product');
  const [selectedApi, setSelectedApi] = useState('get-products');

  // Mock Data สำหรับ Dashboard
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
    { id: 'customer', title: 'Customer Data', count: '14,205', icon: Users, color: 'text-blue-600' },
    { id: 'product', title: 'Product Master', count: '8,430', icon: Box, color: 'text-emerald-600' },
    { id: 'location', title: 'Locations / Branches', count: '125', icon: MapPin, color: 'text-purple-600' },
    { id: 'finance', title: 'Chart of Accounts', count: 'Active', icon: CreditCard, color: 'text-orange-600' },
  ];

  const productMasterData = [
    { id: 'SKU-1001', name: 'Premium Wireless Headset', category: 'Electronics', price: '฿4,590', status: 'Active', sync: 'Synced', quality: 98, updated: '2 mins ago' },
    { id: 'SKU-1002', name: 'Ergonomic Office Chair', category: 'Furniture', price: '฿8,900', status: 'Active', sync: 'Synced', quality: 95, updated: '1 hour ago' },
    { id: 'SKU-1003', name: 'Mechanical Keyboard RGB', category: 'Electronics', price: '฿3,200', status: 'Draft', sync: 'Pending', quality: 60, updated: '4 hours ago' },
    { id: 'SKU-1004', name: '27" 4K Monitor', category: 'Electronics', price: '฿12,500', status: 'Active', sync: 'Synced', quality: 100, updated: '1 day ago' },
    { id: 'SKU-1005', name: 'USB-C Hub Multi-port', category: 'Accessories', price: '฿1,290', status: 'Inactive', sync: 'Error', quality: 85, updated: '2 days ago' },
    { id: 'SKU-1006', name: 'Smart Home Hub v2', category: 'Smart Home', price: '฿2,450', status: 'Active', sync: 'Synced', quality: 92, updated: '3 days ago' },
  ];

  // Mock Data สำหรับ Integration Hub
  const integrationInterfaces = [
    { id: 'INT-001', name: 'Sales Orders Sync', source: 'E-Commerce', target: 'SAP ERP', method: 'Webhook', freq: 'Real-time', status: 'active', lastRun: '2 mins ago' },
    { id: 'INT-002', name: 'Inventory Update', source: 'WMS', target: 'E-Commerce', method: 'Batch API', freq: 'Every 15m', status: 'active', lastRun: '10 mins ago' },
    { id: 'INT-003', name: 'Customer Master Sync', source: 'Salesforce', target: 'Data Lake', method: 'ETL Pipeline', freq: 'Daily (02:00)', status: 'paused', lastRun: '14 hours ago' },
    { id: 'INT-004', name: 'Employee Onboarding', source: 'HR Platform', target: 'Active Directory', method: 'API Trigger', freq: 'On-Event', status: 'active', lastRun: '1 day ago' },
    { id: 'INT-005', name: 'Payment Reconciliation', source: 'Bank Gateway', target: 'SAP ERP', method: 'SFTP File', freq: 'Daily (06:00)', status: 'error', lastRun: 'Failed' },
  ];

  // Mock Data สำหรับ API Docs
  const apiDocs = [
    {
      category: 'Authentication',
      endpoints: [
        { id: 'auth-token', method: 'POST', path: '/auth/token', title: 'Generate Access Token' }
      ]
    },
    {
      category: 'Product Master',
      endpoints: [
        { 
          id: 'get-products', 
          method: 'GET', 
          path: '/master/products', 
          title: 'Get All Products',
          desc: 'Retrieve a list of all products in the master database with optional filtering.',
          params: [
            { name: 'page', type: 'integer', required: false, desc: 'Page number (default 1)' },
            { name: 'limit', type: 'integer', required: false, desc: 'Items per page (default 20)' },
            { name: 'category', type: 'string', required: false, desc: 'Filter by product category' }
          ],
          response: {
            "status": "success",
            "data": [
              { "id": "SKU-1001", "name": "Wireless Headset", "price": 4590 },
              { "id": "SKU-1002", "name": "Office Chair", "price": 8900 }
            ],
            "meta": { "total": 8430, "page": 1 }
          }
        },
        { 
          id: 'create-product', 
          method: 'POST', 
          path: '/master/products', 
          title: 'Create Product',
          desc: 'Create a new product record. This will trigger a sync event to connected systems.',
          params: [
            { name: 'name', type: 'string', required: true, desc: 'Product name' },
            { name: 'sku', type: 'string', required: true, desc: 'Unique Stock Keeping Unit' },
            { name: 'price', type: 'number', required: true, desc: 'Unit price' }
          ],
          response: {
            "status": "created",
            "id": "SKU-1007",
            "message": "Product created successfully"
          }
        },
        { id: 'get-product-detail', method: 'GET', path: '/master/products/{id}', title: 'Get Product Details' },
      ]
    },
    {
      category: 'Integration',
      endpoints: [
        { id: 'trigger-sync', method: 'POST', path: '/integration/trigger/{interfaceId}', title: 'Manually Trigger Sync' },
        { id: 'get-logs', method: 'GET', path: '/integration/logs', title: 'Get Transaction Logs' }
      ]
    }
  ];

  // Helper เพื่อดึงข้อมูล API ที่เลือก
  const currentApi = apiDocs.flatMap(c => c.endpoints).find(e => e.id === selectedApi) || apiDocs[1].endpoints[0];

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
                  NexusCore
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
                <button 
                  onClick={() => setActiveTab('api-docs')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'api-docs' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
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
        
        {/* ================= DASHBOARD VIEW ================= */}
        {activeTab === 'dashboard' && (
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

                    {masterDataDomains.map((domain) => (
                      <div 
                        key={domain.id} 
                        onClick={() => { setActiveTab('mdm'); setSelectedDomain(domain.id); }}
                        className="group p-4 border border-slate-100 rounded-lg hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer bg-white"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-2 rounded-lg bg-slate-50 group-hover:bg-white ${domain.color}`}>
                            <domain.icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] text-slate-400 flex items-center bg-slate-50 px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3 mr-1" /> 2m ago
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600">{domain.title}</h4>
                        <p className="text-sm text-slate-500 mt-1">{domain.count}</p>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                          <div className="bg-indigo-500 h-full w-3/4"></div>
                        </div>
                      </div>
                    ))}

                    <button 
                      onClick={() => setActiveTab('mdm')}
                      className="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                    >
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
          </div>
        )}

        {/* ================= INTEGRATION HUB VIEW ================= */}
        {activeTab === 'integration' && (
          <div className="animate-fade-in">
             <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Integration Hub</h1>
                <p className="text-slate-500">จัดการ Interfaces และติดตามการรับส่งข้อมูลระหว่างระบบ</p>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh Status
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Sidebar: Controls & Filters */}
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
                    <button className="w-full text-left px-3 py-2 text-sm rounded-lg text-slate-600 hover:bg-slate-50">Scheduled Jobs</button>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100">
                     <button className="w-full border border-dashed border-slate-300 text-slate-500 hover:border-indigo-500 hover:text-indigo-600 p-3 rounded-lg text-sm flex justify-center items-center gap-2 transition-colors">
                        + New Interface
                     </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-5 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Cpu className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">System Load</h4>
                      <p className="text-xs text-slate-400">Processing Node A</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">CPU Usage</span>
                        <span className="text-indigo-300 font-mono">42%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[42%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Memory</span>
                        <span className="text-indigo-300 font-mono">68%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[68%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main List Area */}
              <div className="lg:col-span-3 space-y-6">
                {/* Interface List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                   <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-semibold text-slate-800">Interface Definitions</h3>
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-500">Sort by: Status</span>
                      </div>
                   </div>
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
                              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Logs">
                                <FileText className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Settings">
                                <Settings className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                            {/* Visual Flow */}
                            <div className="md:col-span-2 flex items-center gap-3 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                               <div className="flex items-center gap-2">
                                  <Globe className="w-4 h-4 text-slate-400" />
                                  <span className="text-sm font-medium text-slate-700">{intf.source}</span>
                               </div>
                               <ArrowRightLeft className="w-4 h-4 text-slate-300" />
                               <div className="flex items-center gap-2">
                                  <Server className="w-4 h-4 text-slate-400" />
                                  <span className="text-sm font-medium text-slate-700">{intf.target}</span>
                               </div>
                            </div>

                            {/* Details */}
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-slate-400">Method / Frequency</span>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <span className="font-medium">{intf.method}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span>{intf.freq}</span>
                              </div>
                            </div>

                            {/* Actions & Status */}
                            <div className="flex items-center justify-end gap-3">
                               <div className="text-right mr-2">
                                  <p className="text-xs text-slate-400">Last Run</p>
                                  <p className={`text-sm font-medium ${intf.status === 'error' ? 'text-red-600' : 'text-slate-700'}`}>{intf.lastRun}</p>
                               </div>
                               {intf.status === 'active' ? (
                                 <button className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors border border-emerald-100">
                                   <Play className="w-3 h-3 fill-current" /> Running
                                 </button>
                               ) : intf.status === 'paused' ? (
                                  <button className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors border border-amber-100">
                                   <Pause className="w-3 h-3 fill-current" /> Paused
                                 </button>
                               ) : (
                                  <button className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors border border-red-100">
                                   <AlertTriangle className="w-3 h-3" /> Fix Error
                                 </button>
                               )}
                            </div>
                          </div>
                        </div>
                      ))}
                   </div>
                   <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                      <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Show all 12 archived interfaces</button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

         {/* ================= MDM VIEW ================= */}
         {activeTab === 'mdm' && (
           <div className="animate-fade-in h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
              
              {/* MDM Sidebar */}
              <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4">
                 <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 overflow-hidden">
                    <div className="p-3">
                       <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Domains</h2>
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
                    
                    <div className="border-t border-slate-100 p-3 mt-2">
                       <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Governance</h2>
                       <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                          <ShieldCheck className="w-4 h-4 text-slate-400" />
                          Data Quality Rules
                       </button>
                       <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                          <Activity className="w-4 h-4 text-slate-400" />
                          Audit Logs
                       </button>
                    </div>
                 </div>

                 {/* Data Quality Score Card */}
                 <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl shadow-lg p-5 text-white">
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                       <BarChart3 className="w-4 h-4" />
                       <span className="text-xs font-medium uppercase">Data Quality Score</span>
                    </div>
                    <div className="flex items-end gap-2 mb-3">
                       <span className="text-3xl font-bold">94.8%</span>
                       <span className="text-xs bg-indigo-500/50 px-1.5 py-0.5 rounded text-indigo-100 mb-1">+1.2%</span>
                    </div>
                    <div className="w-full bg-indigo-900/50 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-emerald-400 h-full w-[94.8%]"></div>
                    </div>
                    <p className="text-[10px] text-indigo-200 mt-2">คำนวณจากความสมบูรณ์และความถูกต้องของข้อมูล</p>
                 </div>
              </div>

              {/* MDM Main Content */}
              <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                 
                 {/* Toolbar */}
                 <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50/30">
                    <div className="flex items-center gap-3">
                       <h2 className="font-bold text-slate-800 text-lg">Product Master</h2>
                       <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs text-slate-500 font-medium">8,430 Records</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" placeholder="Search SKU, Name..." className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64" />
                       </div>
                       <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg border border-slate-200" title="Filter">
                          <Filter className="w-4 h-4" />
                       </button>
                       <div className="h-6 w-px bg-slate-200 mx-1"></div>
                       <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200">
                          <Download className="w-4 h-4" /> Export
                       </button>
                       <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200">
                          <Plus className="w-4 h-4" /> Add Record
                       </button>
                    </div>
                 </div>

                 {/* Data Grid / Table */}
                 <div className="flex-1 overflow-auto">
                    <table className="w-full text-left border-collapse">
                       <thead className="bg-slate-50 sticky top-0 z-10">
                          <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                             <th className="px-6 py-3 border-b border-slate-100 w-10">
                                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                             </th>
                             <th className="px-6 py-3 border-b border-slate-100">SKU / ID</th>
                             <th className="px-6 py-3 border-b border-slate-100">Product Name</th>
                             <th className="px-6 py-3 border-b border-slate-100">Category</th>
                             <th className="px-6 py-3 border-b border-slate-100 text-right">Price</th>
                             <th className="px-6 py-3 border-b border-slate-100 text-center">Status</th>
                             <th className="px-6 py-3 border-b border-slate-100">Sync Status</th>
                             <th className="px-6 py-3 border-b border-slate-100 text-center">Quality</th>
                             <th className="px-6 py-3 border-b border-slate-100 text-right">Last Updated</th>
                             <th className="px-6 py-3 border-b border-slate-100 w-10"></th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {productMasterData.map((item, idx) => (
                             <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                                <td className="px-6 py-3">
                                   <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                </td>
                                <td className="px-6 py-3 text-sm font-mono text-slate-600">{item.id}</td>
                                <td className="px-6 py-3 text-sm font-medium text-slate-800">{item.name}</td>
                                <td className="px-6 py-3 text-sm text-slate-600">
                                   <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{item.category}</span>
                                </td>
                                <td className="px-6 py-3 text-sm text-slate-700 text-right font-mono">{item.price}</td>
                                <td className="px-6 py-3 text-center">
                                   <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.status === 'Active' ? 'bg-green-50 text-green-700' : item.status === 'Draft' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                                      {item.status}
                                   </span>
                                </td>
                                <td className="px-6 py-3">
                                   <div className="flex items-center gap-1.5">
                                      <div className={`w-2 h-2 rounded-full ${item.sync === 'Synced' ? 'bg-emerald-500' : item.sync === 'Pending' ? 'bg-amber-400' : 'bg-red-500'}`}></div>
                                      <span className="text-xs text-slate-600">{item.sync}</span>
                                   </div>
                                </td>
                                <td className="px-6 py-3 text-center">
                                   <div className="flex items-center justify-center gap-1">
                                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                         <div 
                                            className={`h-full rounded-full ${item.quality >= 90 ? 'bg-emerald-500' : item.quality >= 70 ? 'bg-amber-400' : 'bg-red-500'}`} 
                                            style={{ width: `${item.quality}%` }}
                                         ></div>
                                      </div>
                                      <span className="text-[10px] text-slate-400 w-6 text-right">{item.quality}%</span>
                                   </div>
                                </td>
                                <td className="px-6 py-3 text-sm text-slate-400 text-right whitespace-nowrap">{item.updated}</td>
                                <td className="px-6 py-3 text-right">
                                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Edit">
                                         <Edit2 className="w-4 h-4" />
                                      </button>
                                      <button className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                                         <Trash2 className="w-4 h-4" />
                                      </button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 {/* Pagination */}
                 <div className="h-12 border-t border-slate-100 flex items-center justify-between px-6 bg-slate-50/30">
                    <span className="text-xs text-slate-500">Showing 1-6 of 8,430 records</span>
                    <div className="flex gap-1">
                       <button className="px-3 py-1 border border-slate-200 rounded text-xs text-slate-600 hover:bg-white disabled:opacity-50">Previous</button>
                       <button className="px-3 py-1 border border-slate-200 rounded text-xs bg-indigo-50 text-indigo-600 font-medium">1</button>
                       <button className="px-3 py-1 border border-slate-200 rounded text-xs text-slate-600 hover:bg-white">2</button>
                       <button className="px-3 py-1 border border-slate-200 rounded text-xs text-slate-600 hover:bg-white">3</button>
                       <span className="px-2 py-1 text-xs text-slate-400">...</span>
                       <button className="px-3 py-1 border border-slate-200 rounded text-xs text-slate-600 hover:bg-white">Next</button>
                    </div>
                 </div>

              </div>
           </div>
         )}

         {/* ================= API DOCS VIEW ================= */}
         {activeTab === 'api-docs' && (
           <div className="animate-fade-in h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
              
              {/* API Sidebar */}
              <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-4">
                 <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                      <h2 className="font-bold text-slate-800 flex items-center gap-2">
                        <Code className="w-5 h-5 text-indigo-600" />
                        API Reference
                      </h2>
                      <div className="mt-2 relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input type="text" placeholder="Filter endpoints..." className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-2 space-y-4">
                      {apiDocs.map((group, idx) => (
                        <div key={idx}>
                          <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{group.category}</h3>
                          <div className="space-y-0.5">
                            {group.endpoints.map(ep => (
                              <button 
                                key={ep.id}
                                onClick={() => setSelectedApi(ep.id)}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all group ${selectedApi === ep.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                              >
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold w-10 text-center ${
                                  ep.method === 'GET' ? 'bg-blue-100 text-blue-700' : 
                                  ep.method === 'POST' ? 'bg-emerald-100 text-emerald-700' : 
                                  ep.method === 'PUT' ? 'bg-amber-100 text-amber-700' : 
                                  'bg-red-100 text-red-700'
                                }`}>{ep.method}</span>
                                <span className="truncate">{ep.title}</span>
                                {selectedApi === ep.id && <ChevronRight className="w-3 h-3 ml-auto text-indigo-400" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>

              {/* API Content */}
              <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                 {currentApi && (
                   <div className="flex flex-col h-full overflow-y-auto">
                     {/* Header */}
                     <div className="p-6 border-b border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                           <span className={`px-2 py-1 rounded-md text-sm font-bold ${
                              currentApi.method === 'GET' ? 'bg-blue-100 text-blue-700' : 
                              currentApi.method === 'POST' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                           }`}>{currentApi.method}</span>
                           <h1 className="text-xl font-bold text-slate-800">{currentApi.title}</h1>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 font-mono text-sm text-slate-600 mt-3">
                           <span className="text-slate-400 select-none">https://api.nexushub.com/v1</span>
                           <span className="font-semibold text-indigo-700">{currentApi.path}</span>
                           <button className="ml-auto p-1 text-slate-400 hover:text-indigo-600" title="Copy URL">
                             <Copy className="w-4 h-4" />
                           </button>
                        </div>
                        {currentApi.desc && <p className="mt-4 text-slate-600 text-sm leading-relaxed">{currentApi.desc}</p>}
                     </div>

                     <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Parameters */}
                        <div className="space-y-6">
                           <div>
                              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-slate-400" />
                                Headers
                              </h3>
                              <div className="bg-slate-50 rounded-lg border border-slate-100 p-3 text-sm">
                                 <div className="flex justify-between mb-1">
                                    <span className="font-mono text-slate-600">Authorization</span>
                                    <span className="text-slate-400">Bearer &lt;token&gt;</span>
                                 </div>
                                 <div className="flex justify-between">
                                    <span className="font-mono text-slate-600">Content-Type</span>
                                    <span className="text-slate-400">application/json</span>
                                 </div>
                              </div>
                           </div>

                           {currentApi.params && (
                             <div>
                                <h3 className="font-semibold text-slate-800 mb-3">Query Parameters</h3>
                                <div className="border border-slate-100 rounded-lg overflow-hidden">
                                  <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 border-b border-slate-100">
                                      <tr>
                                        <th className="px-4 py-2 font-medium text-slate-600">Field</th>
                                        <th className="px-4 py-2 font-medium text-slate-600">Type</th>
                                        <th className="px-4 py-2 font-medium text-slate-600">Description</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {currentApi.params.map((param, idx) => (
                                        <tr key={idx}>
                                          <td className="px-4 py-3 font-mono text-indigo-600">
                                            {param.name} {param.required && <span className="text-red-500">*</span>}
                                          </td>
                                          <td className="px-4 py-3 text-slate-500">{param.type}</td>
                                          <td className="px-4 py-3 text-slate-600">{param.desc}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                             </div>
                           )}
                        </div>

                        {/* Response Example */}
                        <div className="space-y-3">
                           <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                             <Terminal className="w-4 h-4 text-slate-400" />
                             Response Example
                           </h3>
                           <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md">
                             <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                               <span className="text-xs text-emerald-400 font-mono">200 OK</span>
                               <span className="text-xs text-slate-400">application/json</span>
                             </div>
                             <div className="p-4 overflow-x-auto">
                               <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                                 {currentApi.response ? JSON.stringify(currentApi.response, null, 2) : '// No example available'}
                               </pre>
                             </div>
                           </div>
                           <button className="w-full mt-2 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-indigo-200 transition-colors">
                             Try it out in Console
                           </button>
                        </div>
                     </div>
                   </div>
                 )}
              </div>
           </div>
         )}

      </main>
    </div>
  );
};

export default NexusHub;