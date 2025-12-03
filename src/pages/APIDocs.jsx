import React, { useState } from 'react';
import { 
  Code, Search, ChevronRight, Copy, Terminal, Lock 
} from 'lucide-react';

const APIDocs = () => {
  const [selectedApi, setSelectedApi] = useState('get-products');

  const apiDocs = [
    {
      category: 'Product Master',
      endpoints: [
        { 
          id: 'get-products', 
          method: 'GET', 
          path: '/master/products', 
          title: 'Get All Products',
          desc: 'Retrieve a list of all products in the master database.',
          response: { "status": "success", "data": [{ "id": "SKU-1001", "name": "Wireless Headset" }] }
        },
        { 
          id: 'create-product', 
          method: 'POST', 
          path: '/master/products', 
          title: 'Create Product',
          desc: 'Create a new product record.',
          response: { "status": "created", "id": "SKU-1007" }
        }
      ]
    }
  ];

  const currentApi = apiDocs.flatMap(c => c.endpoints).find(e => e.id === selectedApi) || apiDocs[0].endpoints[0];

  return (
    <div className="animate-fade-in h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-4">
         <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-600" />
                API Reference
              </h2>
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
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold w-10 text-center ${ep.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{ep.method}</span>
                        <span className="truncate">{ep.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
         <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-2">
               <span className={`px-2 py-1 rounded-md text-sm font-bold bg-slate-100 text-slate-700`}>{currentApi.method}</span>
               <h1 className="text-xl font-bold text-slate-800">{currentApi.title}</h1>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 font-mono text-sm text-slate-600 mt-3">
               <span className="font-semibold text-indigo-700">{currentApi.path}</span>
            </div>
            <p className="mt-4 text-slate-600 text-sm">{currentApi.desc}</p>
         </div>

         <div className="p-6">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-slate-400" /> Response Example
            </h3>
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className="font-mono text-xs text-slate-300">
                {JSON.stringify(currentApi.response, null, 2)}
              </pre>
            </div>
         </div>
      </div>
    </div>
  );
};

export default APIDocs;