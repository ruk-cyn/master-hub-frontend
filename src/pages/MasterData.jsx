import React, { useState, useEffect } from 'react';
import { 
  Users, Box, MapPin, CreditCard, Search, Plus, Edit2, X, Tag, Layers, FileText, Barcode, ArrowLeft, Save, Loader2, Trash2, Image as ImageIcon, UploadCloud 
} from 'lucide-react';
import { masterDataService } from '../services/masterData';

const MasterData = () => {
  // --- States ---
  const [selectedDomain, setSelectedDomain] = useState('product');
  const [viewMode, setViewMode] = useState('list'); 
  const [isLoading, setIsLoading] = useState(false);

  // Data States
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [names, setNames] = useState([]); 

  // Modals Control
  const [showTypeSelectionModal, setShowTypeSelectionModal] = useState(false);
  
  // -- Brand Modal --
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');

  // -- Category Modal --
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // -- Name Modal --
  const [showAddNameModal, setShowAddNameModal] = useState(false);
  const [newNameData, setNewNameData] = useState({
    name_eng: '', description: '', brand_id: '', category_id: '', images: []
  });

  // Mock Data (Domains & Product List)
  const masterDataDomains = [
    { id: 'product', title: 'Product', count: '8,430', icon: Box },
    { id: 'customer', title: 'Customer Data', count: '14,205', icon: Users },
    { id: 'location', title: 'Locations', count: '125', icon: MapPin },
    { id: 'finance', title: 'Chart of Accounts', count: 'Active', icon: CreditCard },
  ];
  const productMasterData = [
    { id: 'SKU-1001', name: 'Premium Wireless Headset', category: 'Electronics', price: '฿4,590', status: 'Active' },
  ];

  // --- Effects ---
  useEffect(() => {
    if (viewMode === 'brands') fetchBrands();
    if (viewMode === 'categories') fetchCategories();
    if (viewMode === 'names') {
      fetchNames();
      // โหลด Brands และ Categories มารอไว้สำหรับ Dropdown
      fetchBrands(); 
      fetchCategories();
    }
  }, [viewMode]);

  // --- API Functions ---
  const fetchBrands = async () => {
    // โหลดเงียบๆ ไม่ต้องขึ้น Loading ใหญ่ ถ้าไม่ใช่หน้า Brand หลัก
    if (viewMode === 'brands') setIsLoading(true);
    try {
      const data = await masterDataService.getData('brands');
      setBrands(data);
    } catch (error) { console.error("Failed to fetch brands", error); } 
    if (viewMode === 'brands') setIsLoading(false);
  };

  const fetchCategories = async () => {
    if (viewMode === 'categories') setIsLoading(true);
    try {
      const data = await masterDataService.getData('categories');
      setCategories(data);
    } catch (error) { console.error("Failed to fetch categories", error); } 
    if (viewMode === 'categories') setIsLoading(false);
  };

  const fetchNames = async () => {
    setIsLoading(true);
    try {
      const data = await masterDataService.getData('names');
      setNames(data);
    } catch (error) { console.error("Failed to fetch names", error); } finally { setIsLoading(false); }
  };

  // --- Save Handlers ---
  const handleSaveBrand = async () => {
    if (!newBrandName.trim()) { alert("กรุณากรอกชื่อแบรนด์"); return; }
    try {
      setIsLoading(true);
      await masterDataService.createData('brands', { name: newBrandName });
      setShowAddBrandModal(false);
      setNewBrandName('');
      fetchBrands();
    } catch (error) { alert("เกิดข้อผิดพลาดในการสร้างแบรนด์"); } finally { setIsLoading(false); }
  };

  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) { alert("กรุณากรอกชื่อหมวดหมู่"); return; }
    try {
      setIsLoading(true);
      await masterDataService.createData('categories', { name: newCategoryName });
      setShowAddCategoryModal(false);
      setNewCategoryName('');
      fetchCategories();
    } catch (error) { alert("เกิดข้อผิดพลาดในการสร้างหมวดหมู่"); } finally { setIsLoading(false); }
  };

  const handleSaveName = async () => {
    // ตรวจสอบข้อมูลก่อนส่ง
    if (!newNameData.name_eng) { alert("กรุณากรอกชื่อสินค้า (Eng)"); return; }
    if (!newNameData.brand_id) { alert("กรุณาเลือก Brand"); return; }
    if (!newNameData.category_id) { alert("กรุณาเลือก Category"); return; }

    try {
      setIsLoading(true);
      // ส่งข้อมูลไปยัง API
      await masterDataService.createData('names', newNameData);
      
      setShowAddNameModal(false);
      setNewNameData({ name_eng: '', description: '', brand_id: '', category_id: '', images: [] });
      fetchNames(); // โหลดข้อมูลใหม่
    } catch (error) { 
      console.error(error);
      alert("เกิดข้อผิดพลาดในการสร้างสินค้า"); 
    } finally { 
      setIsLoading(false); 
    }
  };

  // --- Delete Handlers ---
  const handleDeleteItem = async (domain, id, name, fetchFunc) => {
    if (!window.confirm(`คุณต้องการลบ "${name}" ใช่หรือไม่?`)) return;
    try {
      setIsLoading(true);
      await masterDataService.deleteData(domain, id);
      fetchFunc();
    } catch (error) {
       console.error("Delete error:", error);
       if (error.response?.status === 500) {
          alert(`ไม่สามารถลบ "${name}" ได้ \nเนื่องจากข้อมูลนี้ถูกใช้งานอยู่ในระบบ`);
       } else {
          alert(`ลบข้อมูลไม่สำเร็จ (Error Code: ${error.response?.status})`);
       }
    } finally { setIsLoading(false); }
  };

  // --- Navigation Handlers ---
  const handleDomainChange = (domainId) => { setSelectedDomain(domainId); setViewMode('list'); };
  const handleTypeSelect = (type) => { setShowTypeSelectionModal(false); setViewMode(type); };
  
  const handleMainAddClick = () => {
    if (viewMode === 'list') setShowTypeSelectionModal(true);
    else if (viewMode === 'brands') setShowAddBrandModal(true);
    else if (viewMode === 'categories') setShowAddCategoryModal(true);
    else if (viewMode === 'names') setShowAddNameModal(true);
    else alert(`Add function for ${viewMode} is not implemented yet.`);
  };
  const handleBack = () => { setViewMode('list'); };

  return (
    <div className="animate-fade-in flex flex-col md:flex-row gap-6 h-[calc(100vh-100px)] relative">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4">
         <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 overflow-hidden">
            <div className="p-3">
               <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Domains</h2>
               <div className="space-y-1">
                  {masterDataDomains.map(domain => (
                     <button 
                        key={domain.id}
                        onClick={() => handleDomainChange(domain.id)}
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
            <div className="flex items-center gap-3">
               {viewMode !== 'list' && (
                 <button onClick={handleBack} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                   <ArrowLeft className="w-5 h-5" />
                 </button>
               )}
               <div>
                 <h2 className="font-bold text-slate-800 text-lg capitalize flex items-center gap-2">
                   {selectedDomain}
                   {viewMode !== 'list' && <span className="text-slate-400 text-sm font-normal">/ {viewMode}</span>}
                 </h2>
               </div>
            </div>

            <div className="flex items-center gap-2">
               {selectedDomain === 'product' && (
                 <button 
                    onClick={handleMainAddClick}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                 >
                    <Plus className="w-4 h-4" /> 
                    {viewMode === 'list' ? 'Add' : `New ${viewMode === 'categories' ? 'Category' : viewMode.slice(0, -1)}`} 
                 </button>
               )}
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 overflow-auto">
            
            {/* 1. Main List */}
            {viewMode === 'list' && selectedDomain === 'product' && (
              <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-50 sticky top-0 z-10">
                    <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                       <th className="px-6 py-3 border-b border-slate-100">SKU</th>
                       <th className="px-6 py-3 border-b border-slate-100">Name</th>
                       <th className="px-6 py-3 border-b border-slate-100">Category</th>
                       <th className="px-6 py-3 border-b border-slate-100 text-right">Price</th>
                       <th className="px-6 py-3 border-b border-slate-100 text-center">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {productMasterData.map((item, idx) => (
                       <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-3 text-sm font-mono text-slate-600">{item.id}</td>
                          <td className="px-6 py-3 text-sm font-medium text-slate-800">{item.name}</td>
                          <td className="px-6 py-3 text-sm text-slate-600">{item.category}</td>
                          <td className="px-6 py-3 text-sm text-slate-700 text-right">{item.price}</td>
                          <td className="px-6 py-3 text-center"><span className="px-2 py-0.5 rounded text-xs bg-green-50 text-green-700">Active</span></td>
                       </tr>
                    ))}
                 </tbody>
              </table>
            )}

            {/* 2. Brands View */}
            {viewMode === 'brands' && (
               <DataTable 
                 data={brands} isLoading={isLoading} icon={Tag}
                 onDelete={(id, name) => handleDeleteItem('brands', id, name, fetchBrands)}
                 emptyMessage="ไม่พบข้อมูลแบรนด์"
               />
            )}

            {/* 3. Categories View */}
            {viewMode === 'categories' && (
               <DataTable 
                 data={categories} isLoading={isLoading} icon={Layers}
                 onDelete={(id, name) => handleDeleteItem('categories', id, name, fetchCategories)}
                 emptyMessage="ไม่พบข้อมูลหมวดหมู่"
               />
            )}

            {/* 4. Names View */}
            {viewMode === 'names' && (
               <NamesTable 
                 data={names} isLoading={isLoading} 
                 onDelete={(id, name) => handleDeleteItem('names', id, name, fetchNames)}
               />
            )}

            {/* Placeholder */}
            {['skus'].includes(viewMode) && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Barcode className="w-12 h-12 mb-2 opacity-20" />
                <p>Data view for "{viewMode}" is under construction.</p>
              </div>
            )}
            
         </div>
      </div>

      {/* --- Modals --- */}
      
      {/* Type Selection */}
      {showTypeSelectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Select Type</h3>
              <button onClick={() => setShowTypeSelectionModal(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <OptionButton icon={Tag} color="indigo" label="Brands" onClick={() => handleTypeSelect('brands')} />
              <OptionButton icon={Layers} color="purple" label="Categories" onClick={() => handleTypeSelect('categories')} />
              <OptionButton icon={FileText} color="blue" label="Names" onClick={() => handleTypeSelect('names')} />
              <OptionButton icon={Barcode} color="emerald" label="SKUs" onClick={() => handleTypeSelect('skus')} />
            </div>
          </div>
        </div>
      )}

      {/* Add Brand Modal */}
      {showAddBrandModal && (
         <AddDataModal 
            title="New Brand" icon={Tag} label="Brand Name"
            value={newBrandName} setValue={setNewBrandName}
            onClose={() => setShowAddBrandModal(false)} onSave={handleSaveBrand} isLoading={isLoading}
         />
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
         <AddDataModal 
            title="New Category" icon={Layers} label="Category Name"
            value={newCategoryName} setValue={setNewCategoryName}
            onClose={() => setShowAddCategoryModal(false)} onSave={handleSaveCategory} isLoading={isLoading}
         />
      )}

      {/* Add Name Modal */}
      {showAddNameModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
               <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                     <FileText className="w-5 h-5 text-indigo-600" /> New Product Name
                  </h3>
                  <button onClick={() => setShowAddNameModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Name (Eng) <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" value={newNameData.name_eng} onChange={(e) => setNewNameData({...newNameData, name_eng: e.target.value})} />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>
                        <select 
                           className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                           value={newNameData.brand_id}
                           onChange={(e) => setNewNameData({...newNameData, brand_id: e.target.value})}
                        >
                           <option value="">Select Brand...</option>
                           {/* --- ใช้ข้อมูลจาก API Brands --- */}
                           {brands.map(b => (
                              <option key={b.id} value={b.id}>{b.name}</option>
                           ))}
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select 
                           className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                           value={newNameData.category_id}
                           onChange={(e) => setNewNameData({...newNameData, category_id: e.target.value})}
                        >
                           <option value="">Select Category...</option>
                           {/* --- ใช้ข้อมูลจาก API Categories --- */}
                           {categories.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                           ))}
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none" value={newNameData.description} onChange={(e) => setNewNameData({...newNameData, description: e.target.value})}></textarea>
                     </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                     <label className="block text-sm font-medium text-slate-700 mb-1">Product Images</label>
                     <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer min-h-[250px]">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-3">
                           <UploadCloud className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-slate-700">Click to upload</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button onClick={() => setShowAddNameModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancel</button>
                  <button onClick={handleSaveName} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                     {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                     Save Product
                  </button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};

// --- Sub Components ---
// (คงเดิมเหมือนรอบที่แล้ว)
const OptionButton = ({ icon: Icon, color, label, onClick }) => {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 hover:bg-indigo-50 hover:border-indigo-500',
    purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 hover:bg-purple-50 hover:border-purple-500',
    blue:   'bg-blue-100 text-blue-600 group-hover:bg-blue-600 hover:bg-blue-50 hover:border-blue-500',
    emerald:'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 hover:bg-emerald-50 hover:border-emerald-500',
  };
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-slate-100 transition-all group ${colors[color].split(' ').filter(c => c.startsWith('hover:')).join(' ')}`}>
      <div className={`p-3 rounded-full transition-colors group-hover:text-white ${colors[color].split(' ').filter(c => !c.startsWith('hover:')).join(' ')}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="font-semibold text-slate-700 group-hover:text-slate-900">{label}</span>
    </button>
  );
};

const DataTable = ({ data, isLoading, icon: Icon, onDelete, emptyMessage }) => {
   if (isLoading && data.length === 0) return <div className="flex justify-center h-40 items-center"><Loader2 className="animate-spin text-indigo-600"/></div>;
   return (
      <table className="w-full text-left border-collapse animate-fade-in">
         <thead className="bg-slate-50 sticky top-0 z-10">
            <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
               <th className="px-6 py-3 border-b border-slate-100 w-24">ID</th>
               <th className="px-6 py-3 border-b border-slate-100">Name</th>
               <th className="px-6 py-3 border-b border-slate-100 text-right">Created At</th>
               <th className="px-6 py-3 border-b border-slate-100 w-32 text-right">Actions</th>
            </tr>
         </thead>
         <tbody className="divide-y divide-slate-50">
            {data.map((item) => (
               <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-sm font-mono text-slate-500">{item.id}</td>
                  <td className="px-6 py-3 text-sm font-medium text-slate-800 flex items-center gap-2">
                     <Icon className="w-4 h-4 text-indigo-400" /> {item.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-500 text-right">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-right flex justify-end gap-2">
                     <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                     <button onClick={() => onDelete(item.id, item.name)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </td>
               </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="4" className="text-center py-8 text-slate-500">{emptyMessage}</td></tr>}
         </tbody>
      </table>
   );
};

const NamesTable = ({ data, isLoading, onDelete }) => {
   if (isLoading && data.length === 0) return <div className="flex justify-center h-40 items-center"><Loader2 className="animate-spin text-indigo-600"/></div>;
   return (
      <table className="w-full text-left border-collapse animate-fade-in">
         <thead className="bg-slate-50 sticky top-0 z-10">
            <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
               <th className="px-6 py-3 border-b border-slate-100 w-16">Image</th>
               <th className="px-6 py-3 border-b border-slate-100">Name (Eng)</th>
               <th className="px-6 py-3 border-b border-slate-100">Description</th>
               <th className="px-6 py-3 border-b border-slate-100">Brand</th>
               <th className="px-6 py-3 border-b border-slate-100">Category</th>
               <th className="px-6 py-3 border-b border-slate-100 w-32 text-right">Actions</th>
            </tr>
         </thead>
         <tbody className="divide-y divide-slate-50">
            {data.map((item) => (
               <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3">
                     <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                        {item.images && item.images.length > 0 ? (
                           <img src={item.images[0].url} alt={item.name_eng} className="w-full h-full object-cover" />
                        ) : (
                           <ImageIcon className="w-5 h-5 text-slate-400" />
                        )}
                     </div>
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-slate-800">{item.name_eng}</td>
                  <td className="px-6 py-3 text-sm text-slate-500 max-w-xs truncate">{item.description || "-"}</td>
                  <td className="px-6 py-3 text-sm text-slate-600"><span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">{item.brand ? item.brand.name : "N/A"}</span></td>
                  <td className="px-6 py-3 text-sm text-slate-600">{item.category ? item.category.name : "N/A"}</td>
                  <td className="px-6 py-3 text-right flex justify-end gap-2">
                     <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                     <button onClick={() => onDelete(item.id, item.name_eng)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </td>
               </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="6" className="text-center py-8 text-slate-500">ไม่พบข้อมูลสินค้า</td></tr>}
         </tbody>
      </table>
   );
};

const AddDataModal = ({ title, icon: Icon, label, value, setValue, onClose, onSave, isLoading }) => (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
         <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
               <Icon className="w-5 h-5 text-indigo-600" /> {title}
            </h3>
            <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
         </div>
         <div className="space-y-4">
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{label} <span className="text-red-500">*</span></label>
               <input 
                  type="text" 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" 
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={isLoading}
               />
            </div>
         </div>
         <div className="mt-8 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium" disabled={isLoading}>Cancel</button>
            <button 
               onClick={onSave} 
               disabled={isLoading}
               className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 disabled:bg-indigo-400"
            >
               {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
               Save
            </button>
         </div>
      </div>
   </div>
);

export default MasterData;