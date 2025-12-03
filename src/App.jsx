import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import IntegrationHub from './pages/Integration';
import MasterData from './pages/MasterData';
import APIDocs from './pages/APIDocs';

// Component สำหรับป้องกันหน้า (ถ้าไม่มี Token ให้เด้งไป Login)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Route (หน้าแรก/Login) --- */}
        <Route path="/" element={<Login />} />

        {/* --- Protected Routes (ต้อง Login ก่อน) --- */}
        {/* ครอบด้วย MainLayout เพื่อให้มี Topbar ทุกหน้า */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/integration" element={<IntegrationHub />} />
          <Route path="/master-data" element={<MasterData />} />
          <Route path="/api-docs" element={<APIDocs />} />
        </Route>

        {/* --- 404 / Fallback (ถ้าพิมพ์มั่วให้กลับไปหน้าแรก) --- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;