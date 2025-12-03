import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

const Login = () => {
  // สร้าง State เก็บค่าที่พิมพ์
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // เรียกใช้ฟังก์ชัน login ตัวใหม่ ส่งค่าที่พิมพ์ไปให้
      await authService.login(username, password);
      
      // ถ้าผ่าน ให้ไปหน้า Dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert("เข้าสู่ระบบไม่สำเร็จ! กรุณาตรวจสอบ Email หรือ Password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="flex w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white mx-4 lg:mx-0 h-[600px]">
        
        {/* รูปภาพ (ซ้าย) */}
        <div 
          className="hidden lg:block w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-12 text-white">
            <h2 className="text-3xl font-bold mb-2">Master Hub</h2>
            <p className="text-gray-200">ระบบจัดการสินค้าคงคลังอัจฉริยะ</p>
          </div>
        </div>

        {/* ฟอร์ม (ขวา) */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">ยินดีต้อนรับ</h1>
            <p className="text-gray-500 mb-8">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>

            <form className="space-y-6" onSubmit={handleLogin}>
              
              {/* Email / Username Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Username / Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input 
                    type="text" 
                    placeholder="username" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    disabled={isLoading}
                    value={username} // ผูกค่ากับ State
                    onChange={(e) => setUsername(e.target.value)} // อัปเดตค่าเมื่อพิมพ์
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">รหัสผ่าน</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    disabled={isLoading}
                    value={password} // ผูกค่ากับ State
                    onChange={(e) => setPassword(e.target.value)} // อัปเดตค่าเมื่อพิมพ์
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all 
                  ${isLoading 
                    ? 'bg-indigo-400 cursor-not-allowed text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 shadow-indigo-500/30'
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  <>
                    เข้าสู่ระบบ <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;