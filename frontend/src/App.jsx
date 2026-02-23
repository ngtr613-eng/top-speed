import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { CarsPage } from './pages/CarsPage';
import { CarDetailPage } from './pages/CarDetailPage';
import { PurchasePage } from './pages/PurchasePage';
import { CarsEditingPage } from './pages/CarsEditingPage';
import { ServiceMaintenancePage } from './pages/ServiceMaintenancePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { OTPVerificationPage } from './pages/OTPVerificationPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import { Navigation } from './components/Navigation';
import { SettingsPanel } from './components/SettingsPanel';
import './styles/globals.css';

function App() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <Navigation onSettingsClick={() => setIsSettingsPanelOpen(true)} />
        <SettingsPanel 
          isOpen={isSettingsPanelOpen} 
          onClose={() => setIsSettingsPanelOpen(false)} 
        />
        <Routes>
          {/* Public Auth Routes - Only accessible without login */}
          <Route path="/" element={<SignUpPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Main Routes - Only after login */}
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/cars" element={<ProtectedRoute><CarsPage /></ProtectedRoute>} />
          <Route path="/car-detail" element={<ProtectedRoute><CarDetailPage /></ProtectedRoute>} />
          <Route path="/purchase" element={<ProtectedRoute><PurchasePage /></ProtectedRoute>} />
          <Route path="/cars-editing" element={<ProtectedRoute><CarsEditingPage /></ProtectedRoute>} />
          <Route path="/service-maintenance" element={<ProtectedRoute><ServiceMaintenancePage /></ProtectedRoute>} />
          
          {/* Protected Admin Route - Only for admin email */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

          {/* Fallback Route - Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
