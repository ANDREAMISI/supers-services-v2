import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './Layouts/MainLayout';
import AdminLayout from './Layouts/AdminLayout';
import Home from './Pages/Home';
import AdminLogin from './Pages/Auth/LoginAdmin';
import AdminDashboard from './Pages/Dashboard';
import AdminServices from './Pages/admin/Services';
import AdminTestimonials from './Pages/admin/Testimonials';
import AdminMessages from './Pages/admin/Messages';
import AdminSettings from './Pages/admin/Settings';
import AOS from 'aos';
import './index.css';
import 'aos/dist/aos.css';
import './i18n';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  return user ? children : <Navigate to="/admin/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

function App() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);