import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaTachometerAlt, 
  FaBoxes, 
  FaComments, 
  FaEnvelope, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/admin/services', icon: FaBoxes, label: 'Services' },
    { path: '/admin/testimonials', icon: FaComments, label: 'Témoignages' },
    { path: '/admin/messages', icon: FaEnvelope, label: 'Messages' },
    { path: '/admin/settings', icon: FaCog, label: 'Paramètres' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}>
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          {sidebarOpen && (
            <span className="text-xl font-bold text-orange-600">Admin Panel</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-orange-600/10 text-orange-600 border-r-4 border-orange-600'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 mt-8 text-red-600 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaSignOutAlt className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Déconnexion</span>}
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;