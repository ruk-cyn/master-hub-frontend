import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Box, MapPin, CreditCard, Search, Plus, Edit2, X, Tag, Layers, FileText, Barcode, ArrowLeft, Save, Loader2, Trash2, Image as ImageIcon, UploadCloud, QrCode, AlertCircle, CheckCircle, AlertTriangle 
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
  const [skus, setSkus] = useState([]); 
  const [serials, setSerials] = useState([]); 

  // Modals Control
  const [showTypeSelectionModal, setShowTypeSelectionModal] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddNameModal, setShowAddNameModal] = useState(false);
  const [newNameData, setNewNameData] = useState({ name_eng: '', description: '', brand_id: '', category_id: '', images: [] });
  const [showAddSkuModal, setShowAddSkuModal] = useState(false);
  const [newSkuData, setNewSkuData] = useState({ sku_code: '', cost_price: '', retail_price: '', dealer_price: '', warranty_days: 365, status: 'active' });

  // -- Serial Modal States --
  const [showAddSerialModal, setShowAddSerialModal] = useState(false);
  const [newSerialData, setNewSerialData] = useState({ sku: '', status: 'instock' });
  const [serialInput, setSerialInput] = useState(''); // ค่าที่พิมพ์อยู่
  const [scannedItems, setScannedItems] = useState([]); // รายการที่ Add เข้ามาแล้ว
  const serialInputRef = useRef(null);

  // Mock Data
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
    if (viewMode === 'names') { fetchNames(); fetchBrands(); fetchCategories(); }
    if (viewMode === 'skus') fetchSkus();
    if (viewMode === 'serials') { fetchSerials(); fetchSkus(); }
  }, [viewMode]);

  // --- API Functions ---
  const fetchBrands = async () => { if (viewMode === 'brands') setIsLoading(true); try { const data = await masterDataService.getData('brands'); setBrands(data); } catch (error) { console.error(error); } if (viewMode === 'brands') setIsLoading(false); };
  const fetchCategories = async () => { if (viewMode === 'categories') setIsLoading(true); try { const data = await masterDataService.getData('categories'); setCategories(data); } catch (error) { console.error(error); } if (viewMode === 'categories') setIsLoading(false); };
  const fetchNames = async () => { setIsLoading(true); try { const data = await masterDataService.getData('names'); setNames(data); } catch (error) { console.error(error); } finally { setIsLoading(false); } };
  const fetchSkus = async () => { if(viewMode === 'skus') setIsLoading(true); try { const data = await masterDataService.getData('skus'); setSkus(data); } catch (error) { console.error(error); } if(viewMode === 'skus') setIsLoading(false); };
  const fetchSerials = async () => { setIsLoading(true); try { const data = await masterDataService.getData('serials'); setSerials(data); } catch (error) { console.error(error); } finally { setIsLoading(false); } };

  // --- Save Handlers (General) ---
  const handleSaveBrand = async () => { if (!newBrandName.trim()) { alert("กรุณากรอกชื่อแบรนด์"); return; } try { setIsLoading(true); await masterDataService.createData('brands', { name: newBrandName }); setShowAddBrandModal(false); setNewBrandName(''); fetchBrands(); } catch (error) { alert("Error"); } finally { setIsLoading(false); } };
  const handleSaveCategory = async () => { if (!newCategoryName.trim()) { alert("กรุณากรอกชื่อหมวดหมู่"); return; } try { setIsLoading(true); await masterDataService.createData('categories', { name: newCategoryName }); setShowAddCategoryModal(false); setNewCategoryName(''); fetchCategories(); } catch (error) { alert("Error"); } finally { setIsLoading(false); } };
  const handleSaveName = async () => { if (!newNameData.name_eng) { alert("กรุณากรอกข้อมูล"); return; } try { setIsLoading(true); await masterDataService.createData('names', newNameData); setShowAddNameModal(false); setNewNameData({ name_eng: '', description: '', brand_id: '', category_id: '', images: [] }); fetchNames(); } catch (error) { alert("Error"); } finally { setIsLoading(false); } };
  const handleSaveSku = async () => { if (!newSkuData.sku_code) { alert("กรุณากรอก SKU"); return; } try { setIsLoading(true); await masterDataService.createData('skus', newSkuData); setShowAddSkuModal(false); setNewSkuData({ sku_code: '', cost_price: '', retail_price: '', dealer_price: '', warranty_days: 365, status: 'active' }); fetchSkus(); } catch (error) { alert("Error"); } finally { setIsLoading(false); } };

  // --- Serial Logic (Block System + Validation) ---
  const handleAddSerialBlock = () => {
    const rawInput = serialInput.trim();
    if (!rawInput) return;

    // แยก Input (รองรับ Copy Paste หลายบรรทัด)
    const inputs = rawInput.split(/[\n, ]+/).filter(s => s !== '');
    
    // ตัวแปรสำหรับเก็บรายการที่จะเพิ่ม
    const itemsToAdd = [];
    
    inputs.forEach(text => {
        // 1. เช็คซ้ำใน DB หรือในรายการที่เพิ่มไปแล้ว
        const isDuplicateDB = serials.some(s => s.serial_number === text);
        const isDuplicateList = scannedItems.some(i => i.text === text) || itemsToAdd.some(i => i.text === text);

        if (isDuplicateDB || isDuplicateList) {
            // Popup แจ้งเตือน -> ตกลง -> ไม่เพิ่ม (ข้ามไปเลย)
            alert(`Serial Number "${text}" มีอยู่ในระบบแล้ว หรือ ซ้ำกับรายการที่เพิ่มไปแล้ว`);
            return; 
        }

        // 2. เช็คว่าไปตรงกับ SKU Code หรือไม่ (Scan ผิด)
        const isSkuMatch = skus.some(s => s.sku_code === text);
        if (isSkuMatch) {
            // Popup ถามยืนยัน
            const confirmAdd = window.confirm(`รหัส "${text}" ตรงกับรหัส SKU สินค้า\nคุณแน่ใจหรือไม่ว่าเป็น Serial Number จริง?`);
            if (confirmAdd) {
                // ถ้าใช่ ให้เพิ่มได้ แต่เป็นสีเหลือง
                itemsToAdd.push({ id: Date.now() + Math.random(), text, warning: 'Matches SKU Code' });
            }
            return;
        }

        // 3. ปกติ (สีเขียว/ขาว)
        itemsToAdd.push({ id: Date.now() + Math.random(), text, warning: null });
    });

    // อัปเดต State
    if (itemsToAdd.length > 0) {
        setScannedItems(prev => [...prev, ...itemsToAdd]);
    }
    
    setSerialInput('');
    // Focus กลับไปที่ Input
    if(serialInputRef.current) serialInputRef.current.focus();
  };

  const handleSerialKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSerialBlock();
    }
  };

  const removeSerialBlock = (id) => {
    setScannedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveSerial = async () => {
    if (!newSerialData.sku) { alert("กรุณาเลือก SKU"); return; }
    if (scannedItems.length === 0) { alert("ไม่พบรายการ Serial Number"); return; }

    try {
      setIsLoading(true);
      // Loop save
      const promises = scannedItems.map(item => {
         return masterDataService.createData('serials', {
            serial_number: item.text,
            sku: newSerialData.sku,
            status: newSerialData.status
         });
      });

      await Promise.all(promises);

      setShowAddSerialModal(false);
      setNewSerialData({ sku: '', status: 'instock' });
      setScannedItems([]);
      fetchSerials();
      alert(`บันทึกสำเร็จ ${scannedItems.length} รายการ`);
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Delete Handlers ---
  const handleDeleteItem = async (domain, id, name, fetchFunc) => {
    if (!window.confirm(`คุณต้องการลบ "${name}" ใช่หรือไม่?`)) return;
    try { setIsLoading(true); await masterDataService.deleteData(domain, id); fetchFunc(); } 
    catch (error) { alert(`ลบข้อมูลไม่สำเร็จ (Error Code: ${error.response?.status})`); } finally { setIsLoading(false); }
  };

  // --- Navigation ---
  const handleDomainChange = (domainId) => { setSelectedDomain(domainId); setViewMode('list'); };
  const handleTypeSelect = (type) => { setShowTypeSelectionModal(false); setViewMode(type); };
  const handleMainAddClick = () => {
    if (viewMode === 'list') setShowTypeSelectionModal(true);
    else if (viewMode === 'brands') setShowAddBrandModal(true);
    else if (viewMode === 'categories') setShowAddCategoryModal(true);
    else if (viewMode === 'names') setShowAddNameModal(true);
    else if (viewMode === 'skus') setShowAddSkuModal(true);
    else if (viewMode === 'serials') { setScannedItems([]); setShowAddSerialModal(true); }
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
                     <button key={domain.id} onClick={() => handleDomainChange(domain.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedDomain === domain.id ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
                        <domain.icon className={`w-4 h-4 ${selectedDomain === domain.id ? 'text-indigo-600' : 'text-slate-400'}`} /> {domain.title}
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
               {viewMode !== 'list' && <button onClick={handleBack} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><ArrowLeft className="w-5 h-5" /></button>}
               <div><h2 className="font-bold text-slate-800 text-lg capitalize flex items-center gap-2">{selectedDomain} {viewMode !== 'list' && <span className="text-slate-400 text-sm font-normal">/ {viewMode}</span>}</h2></div>
            </div>
            <div className="flex items-center gap-2">
               {selectedDomain === 'product' && <button onClick={handleMainAddClick} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"><Plus className="w-4 h-4" /> {viewMode === 'list' ? 'Add' : `New ${viewMode === 'categories' ? 'Category' : viewMode === 'skus' ? 'SKU' : viewMode === 'serials' ? 'Serial' : viewMode.slice(0, -1)}`}</button>}
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 overflow-auto">
            {viewMode === 'list' && selectedDomain === 'product' && (
              <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-50 sticky top-0 z-10"><tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider"><th className="px-6 py-3 border-b border-slate-100">SKU</th><th className="px-6 py-3 border-b border-slate-100">Name</th><th className="px-6 py-3 border-b border-slate-100">Category</th><th className="px-6 py-3 border-b border-slate-100 text-right">Price</th><th className="px-6 py-3 border-b border-slate-100 text-center">Status</th></tr></thead>
                 <tbody className="divide-y divide-slate-50">{productMasterData.map((item, idx) => (<tr key={idx} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-3 text-sm font-mono text-slate-600">{item.id}</td><td className="px-6 py-3 text-sm font-medium text-slate-800">{item.name}</td><td className="px-6 py-3 text-sm text-slate-600">{item.category}</td><td className="px-6 py-3 text-sm text-slate-700 text-right">{item.price}</td><td className="px-6 py-3 text-center"><span className="px-2 py-0.5 rounded text-xs bg-green-50 text-green-700">Active</span></td></tr>))}</tbody>
              </table>
            )}
            {viewMode === 'brands' && <DataTable data={brands} isLoading={isLoading} icon={Tag} onDelete={(id, name) => handleDeleteItem('brands', id, name, fetchBrands)} emptyMessage="ไม่พบข้อมูลแบรนด์" />}
            {viewMode === 'categories' && <DataTable data={categories} isLoading={isLoading} icon={Layers} onDelete={(id, name) => handleDeleteItem('categories', id, name, fetchCategories)} emptyMessage="ไม่พบข้อมูลหมวดหมู่" />}
            {viewMode === 'names' && <NamesTable data={names} isLoading={isLoading} onDelete={(id, name) => handleDeleteItem('names', id, name, fetchNames)} />}
            {viewMode === 'skus' && <SkusTable data={skus} isLoading={isLoading} onDelete={(id, code) => handleDeleteItem('skus', id, code, fetchSkus)} />}
            {viewMode === 'serials' && <SerialsTable data={serials} isLoading={isLoading} onDelete={(id, sn) => handleDeleteItem('serials', id, sn, fetchSerials)} />}
         </div>
      </div>

      {/* --- Modals --- */}
      {showTypeSelectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-slate-800">Select Type</h3><button onClick={() => setShowTypeSelectionModal(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-400" /></button></div>
            <div className="grid grid-cols-3 gap-4">
              <OptionButton icon={Tag} color="indigo" label="Brands" onClick={() => handleTypeSelect('brands')} />
              <OptionButton icon={Layers} color="purple" label="Categories" onClick={() => handleTypeSelect('categories')} />
              <OptionButton icon={FileText} color="blue" label="Names" onClick={() => handleTypeSelect('names')} />
              <OptionButton icon={Barcode} color="emerald" label="SKUs" onClick={() => handleTypeSelect('skus')} />
              <OptionButton icon={QrCode} color="orange" label="Serials" onClick={() => handleTypeSelect('serials')} />
            </div>
          </div>
        </div>
      )}

      {showAddBrandModal && <AddDataModal title="New Brand" icon={Tag} label="Brand Name" value={newBrandName} setValue={setNewBrandName} onClose={() => setShowAddBrandModal(false)} onSave={handleSaveBrand} isLoading={isLoading} />}
      {showAddCategoryModal && <AddDataModal title="New Category" icon={Layers} label="Category Name" value={newCategoryName} setValue={setNewCategoryName} onClose={() => setShowAddCategoryModal(false)} onSave={handleSaveCategory} isLoading={isLoading} />}
      {showAddNameModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
               <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-600" /> New Product Name</h3><button onClick={() => setShowAddNameModal(false)}><X className="w-5 h-5 text-slate-400" /></button></div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <div><label className="block text-sm font-medium text-slate-700 mb-1">Name (Eng) *</label><input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2" value={newNameData.name_eng} onChange={(e) => setNewNameData({...newNameData, name_eng: e.target.value})} /></div>
                     <div><label className="block text-sm font-medium text-slate-700 mb-1">Brand</label><select className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white" value={newNameData.brand_id} onChange={(e) => setNewNameData({...newNameData, brand_id: e.target.value})}><option value="">Select Brand...</option>{brands.map(b => (<option key={b.id} value={b.id}>{b.name}</option>))}</select></div>
                     <div><label className="block text-sm font-medium text-slate-700 mb-1">Category</label><select className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white" value={newNameData.category_id} onChange={(e) => setNewNameData({...newNameData, category_id: e.target.value})}><option value="">Select Category...</option>{categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}</select></div>
                     <div><label className="block text-sm font-medium text-slate-700 mb-1">Description</label><textarea className="w-full border border-slate-300 rounded-lg px-3 py-2 h-24 resize-none" value={newNameData.description} onChange={(e) => setNewNameData({...newNameData, description: e.target.value})}></textarea></div>
                  </div>
                  <div className="space-y-4"><label className="block text-sm font-medium text-slate-700 mb-1">Product Images</label><div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer min-h-[250px]"><div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-3"><UploadCloud className="w-6 h-6" /></div><p className="text-sm font-medium text-slate-700">Click to upload</p></div></div>
               </div>
               <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100"><button onClick={() => setShowAddNameModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancel</button><button onClick={handleSaveName} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">{isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Product</button></div>
            </div>
         </div>
      )}
      {showAddSkuModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
               <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Barcode className="w-5 h-5 text-indigo-600" /> New SKU</h3><button onClick={() => setShowAddSkuModal(false)}><X className="w-5 h-5 text-slate-400" /></button></div>
               <div className="grid grid-cols-1 gap-4">
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">SKU Code *</label><input type="text" placeholder="e.g. 6970631320072" className="w-full border border-slate-300 rounded-lg px-3 py-2 font-mono" value={newSkuData.sku_code} onChange={(e) => setNewSkuData({...newSkuData, sku_code: e.target.value})} /></div>
                  <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 mb-1">Retail Price</label><input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2" value={newSkuData.retail_price} onChange={(e) => setNewSkuData({...newSkuData, retail_price: e.target.value})} /></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Dealer Price</label><input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2" value={newSkuData.dealer_price} onChange={(e) => setNewSkuData({...newSkuData, dealer_price: e.target.value})} /></div></div>
                  <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 mb-1">Cost Price</label><input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2" value={newSkuData.cost_price} onChange={(e) => setNewSkuData({...newSkuData, cost_price: e.target.value})} /></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Warranty (Days)</label><input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2" value={newSkuData.warranty_days} onChange={(e) => setNewSkuData({...newSkuData, warranty_days: e.target.value})} /></div></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Status</label><select className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white" value={newSkuData.status} onChange={(e) => setNewSkuData({...newSkuData, status: e.target.value})}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
               </div>
               <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100"><button onClick={() => setShowAddSkuModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancel</button><button onClick={handleSaveSku} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">{isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save SKU</button></div>
            </div>
         </div>
      )}

      {/* Add Serial Modal (Updated) */}
      {showAddSerialModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 flex flex-col max-h-[90vh]">
               <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 flex-shrink-0">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                     <QrCode className="w-5 h-5 text-indigo-600" /> New Serial Numbers
                  </h3>
                  <button onClick={() => setShowAddSerialModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
               </div>
               
               <div className="space-y-4 overflow-y-auto flex-1 px-1">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">SKU (Product) <span className="text-red-500">*</span></label>
                     <select className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 bg-white" value={newSerialData.sku} onChange={(e) => setNewSerialData({...newSerialData, sku: e.target.value})}>
                        <option value="">Select SKU...</option>
                        {skus.map(s => (<option key={s.id} value={s.id}>{s.sku_code} - {s.name || 'No Name'}</option>))}
                     </select>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Scan Serial Numbers <span className="text-red-500">*</span></label>
                     <input 
                        ref={serialInputRef}
                        type="text" 
                        autoFocus
                        placeholder="Scan barcode here (Enter)"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm mb-3" 
                        value={serialInput}
                        onChange={(e) => setSerialInput(e.target.value)}
                        onKeyDown={handleSerialKeyDown}
                     />
                     
                     {/* Blocks Container */}
                     <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 min-h-[150px] flex flex-wrap content-start gap-2">
                        {scannedItems.length === 0 && <span className="text-slate-400 text-sm w-full text-center mt-10">No items scanned</span>}
                        
                        {scannedItems.map((item) => (
                           <div 
                              key={item.id} 
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border shadow-sm transition-all animate-fade-in
                                 ${item.warning 
                                    ? 'bg-amber-100 text-amber-700 border-amber-200' // สีเหลือง (SKU Match)
                                    : 'bg-white text-slate-700 border-slate-200' // ปกติ
                                 }`}
                           >
                              {item.warning ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4 text-emerald-500" />}
                              <span className="font-mono font-medium">{item.text}</span>
                              <button onClick={() => removeSerialBlock(item.id)} className="ml-1 p-0.5 hover:bg-black/10 rounded-full transition-colors">
                                 <X className="w-3 h-3" />
                              </button>
                           </div>
                        ))}
                     </div>
                     <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                        <span>Total: {scannedItems.length} items</span>
                        <div className="flex gap-3">
                           <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> SKU Match</span>
                           <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Good</span>
                        </div>
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                     <select className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 bg-white" value={newSerialData.status} onChange={(e) => setNewSerialData({...newSerialData, status: e.target.value})}>
                        <option value="instock">In Stock</option><option value="sold">Sold</option><option value="reserved">Reserved</option><option value="defective">Defective</option>
                     </select>
                  </div>
               </div>

               <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100 flex-shrink-0">
                  <button onClick={() => setShowAddSerialModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancel</button>
                  <button onClick={handleSaveSerial} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                     {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                     Save Serials
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

// ... Sub Components ...
const OptionButton = ({ icon: Icon, color, label, onClick }) => {
  const colors = { indigo: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 hover:bg-indigo-50 hover:border-indigo-500', purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 hover:bg-purple-50 hover:border-purple-500', blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 hover:bg-blue-50 hover:border-blue-500', emerald:'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 hover:bg-emerald-50 hover:border-emerald-500', orange: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 hover:bg-orange-50 hover:border-orange-500' };
  return ( <button onClick={onClick} className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-slate-100 transition-all group ${colors[color].split(' ').filter(c => c.startsWith('hover:')).join(' ')}`}><div className={`p-3 rounded-full transition-colors group-hover:text-white ${colors[color].split(' ').filter(c => !c.startsWith('hover:')).join(' ')}`}><Icon className="w-6 h-6" /></div><span className="font-semibold text-slate-700 group-hover:text-slate-900">{label}</span></button> );
};
const DataTable = ({ data, isLoading, icon: Icon, onDelete, emptyMessage }) => {
   if (isLoading && data.length === 0) return <div className="flex justify-center h-40 items-center"><Loader2 className="animate-spin text-indigo-600"/></div>;
   return ( <table className="w-full text-left border-collapse animate-fade-in"><thead className="bg-slate-50 sticky top-0 z-10"><tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider"><th className="px-6 py-3 border-b border-slate-100 w-24">ID</th><th className="px-6 py-3 border-b border-slate-100">Name</th><th className="px-6 py-3 border-b border-slate-100 text-right">Created At</th><th className="px-6 py-3 border-b border-slate-100 w-32 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-50">{data.map((item) => (<tr key={item.id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-3 text-sm font-mono text-slate-500">{item.id}</td><td className="px-6 py-3 text-sm font-medium text-slate-800 flex items-center gap-2"><Icon className="w-4 h-4 text-indigo-400" /> {item.name}</td><td className="px-6 py-3 text-sm text-slate-500 text-right">{new Date(item.created_at).toLocaleDateString()}</td><td className="px-6 py-3 text-right flex justify-end gap-2"><button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 className="w-4 h-4" /></button><button onClick={() => onDelete(item.id, item.name)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button></td></tr>))}{data.length === 0 && <tr><td colSpan="4" className="text-center py-8 text-slate-500">{emptyMessage}</td></tr>}</tbody></table> );
};
const NamesTable = ({ data, isLoading, onDelete }) => {
   if (isLoading && data.length === 0) return <div className="flex justify-center h-40 items-center"><Loader2 className="animate-spin text-indigo-600"/></div>;
   return ( <table className="w-full text-left border-collapse animate-fade-in"><thead className="bg-slate-50 sticky top-0 z-10"><tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider"><th className="px-6 py-3 border-b border-slate-100 w-16">Image</th><th className="px-6 py-3 border-b border-slate-100">Name (Eng)</th><th className="px-6 py-3 border-b border-slate-100">Description</th><th className="px-6 py-3 border-b border-slate-100">Brand</th><th className="px-6 py-3 border-b border-slate-100">Category</th><th className="px-6 py-3 border-b border-slate-100 w-32 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-50">{data.map((item) => (<tr key={item.id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-3"><div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">{item.images && item.images.length > 0 ? (<img src={item.images[0].url} alt={item.name_eng} className="w-full h-full object-cover" />) : (<ImageIcon className="w-5 h-5 text-slate-400" />)}</div></td><td className="px-6 py-3 text-sm font-medium text-slate-800">{item.name_eng}</td><td className="px-6 py-3 text-sm text-slate-500 max-w-xs truncate">{item.description || "-"}</td><td className="px-6 py-3 text-sm text-slate-600"><span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">{item.brand ? item.brand.name : "N/A"}</span></td><td className="px-6 py-3 text-sm text-slate-600">{item.category ? item.category.name : "N/A"}</td><td className="px-6 py-3 text-right flex justify-end gap-2"><button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 className="w-4 h-4" /></button><button onClick={() => onDelete(item.id, item.name_eng)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button></td></tr>))}{data.length === 0 && <tr><td colSpan="6" className="text-center py-8 text-slate-500">ไม่พบข้อมูลสินค้า</td></tr>}</tbody></table> );
};
const SkusTable = ({ data, isLoading, onDelete }) => {
    if (isLoading && data.length === 0) return <div className="flex justify-center h-40 items-center"><Loader2 className="animate-spin text-indigo-600"/></div>;
    return ( <table className="w-full text-left border-collapse animate-fade-in"><thead className="bg-slate-50 sticky top-0 z-10"><tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider"><th className="px-6 py-3 border-b border-slate-100 w-32">SKU Code</th><th className="px-6 py-3 border-b border-slate-100 text-right">Retail Price</th><th className="px-6 py-3 border-b border-slate-100 text-right">Dealer Price</th><th className="px-6 py-3 border-b border-slate-100 text-center">Warranty</th><th className="px-6 py-3 border-b border-slate-100 text-center">Status</th><th className="px-6 py-3 border-b border-slate-100 w-32 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-50">{data.map((item) => (<tr key={item.id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-3 text-sm font-mono text-slate-600 font-bold">{item.sku_code}</td><td className="px-6 py-3 text-sm text-slate-600 text-right">{item.retail_price ? `฿${item.retail_price}` : '-'}</td><td className="px-6 py-3 text-sm text-slate-600 text-right">{item.dealer_price ? `฿${item.dealer_price}` : '-'}</td><td className="px-6 py-3 text-sm text-slate-600 text-center">{item.warranty_days}d</td><td className="px-6 py-3 text-center"><span className={`px-2 py-0.5 rounded text-xs uppercase font-bold ${item.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span></td><td className="px-6 py-3 text-right flex justify-end gap-2"><button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 className="w-4 h-4" /></button><button onClick={() => onDelete(item.id, item.sku_code)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button></td></tr>))}{data.length === 0 && <tr><td colSpan="6" className="text-center py-8 text-slate-500">ไม่พบข้อมูล SKU</td></tr>}</tbody></table> );
 };
const SerialsTable = ({ data, isLoading, onDelete }) => {
   if (isLoading && data.length === 0) return <div className="flex justify-center h-40 items-center"><Loader2 className="animate-spin text-indigo-600"/></div>;
   return ( <table className="w-full text-left border-collapse animate-fade-in"><thead className="bg-slate-50 sticky top-0 z-10"><tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider"><th className="px-6 py-3 border-b border-slate-100 w-40">Serial No.</th><th className="px-6 py-3 border-b border-slate-100">SKU Code</th><th className="px-6 py-3 border-b border-slate-100">Product Name</th><th className="px-6 py-3 border-b border-slate-100">Company</th><th className="px-6 py-3 border-b border-slate-100 text-center">Status</th><th className="px-6 py-3 border-b border-slate-100 w-32 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-50">{data.map((item) => (<tr key={item.serial_id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-3 text-sm font-mono text-indigo-600 font-medium">{item.serial_number}</td><td className="px-6 py-3 text-sm font-mono text-slate-600">{item.sku_code}</td><td className="px-6 py-3 text-sm text-slate-700">{item.product_name || '-'}</td><td className="px-6 py-3 text-sm text-slate-600">{item.company_name}</td><td className="px-6 py-3 text-center"><span className={`px-2 py-0.5 rounded text-xs uppercase font-bold ${item.status === 'instock' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span></td><td className="px-6 py-3 text-right flex justify-end gap-2"><button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 className="w-4 h-4" /></button><button onClick={() => onDelete(item.serial_id, item.serial_number)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button></td></tr>))}{data.length === 0 && <tr><td colSpan="6" className="text-center py-8 text-slate-500">ไม่พบข้อมูล Serial Number</td></tr>}</tbody></table> );
};
const AddDataModal = ({ title, icon: Icon, label, value, setValue, onClose, onSave, isLoading }) => ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"><div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6"><div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Icon className="w-5 h-5 text-indigo-600" /> {title}</h3><button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button></div><div className="space-y-4"><div><label className="block text-sm font-medium text-slate-700 mb-1">{label} <span className="text-red-500">*</span></label><input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" value={value} onChange={(e) => setValue(e.target.value)} disabled={isLoading} /></div></div><div className="mt-8 flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium" disabled={isLoading}>Cancel</button><button onClick={onSave} disabled={isLoading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 disabled:bg-indigo-400">{isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</button></div></div></div> );

export default MasterData;