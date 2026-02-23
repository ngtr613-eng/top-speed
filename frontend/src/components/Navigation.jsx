import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, Settings, Lock, Menu, X } from 'lucide-react';

export const Navigation = ({ onSettingsClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide navigation links on public auth pages
  const isPublicPage = ['/login', '/signup', '/verify-otp'].includes(location.pathname);

  // Check if user is admin
  const ADMIN_EMAIL = 'belalmohamedyousry@gmail.com';
  const isAdmin =
    user &&
    (user.role === 'admin' ||
      (user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()));

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: '/cars', label: 'Cars' },
    { to: '/service-maintenance', label: 'Service' },
    { to: '/cars-editing', label: 'Modifications' },
  ];

  return (
    <nav className="bg-gradient-to-r from-black via-gray-950 to-black border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
        <Link to={user ? "/home" : "/"} className="flex items-center gap-2 hover:opacity-80 transition duration-300 group active:scale-95 flex-shrink-0">
          <img 
            src="/images/logo.jpg" 
            alt="TOP SPEED Logo" 
            className="h-16 object-contain group-active:shadow-lg group-active:shadow-red-600/50 transition duration-150" 
          />
        </Link>

        {/* Desktop Navigation */}
        {!isPublicPage && (
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to}
                className="text-gray-300 hover:text-white font-medium transition duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-yellow-300 hover:text-yellow-400 font-medium transition duration-300 relative group flex items-center gap-1"
              >
                <Lock size={16} />
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-600 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </div>
        )}

        {/* Right Side - User Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <>
              {/* Desktop User Info */}
              <div className="hidden sm:flex items-center gap-5">
                <div className="px-4 py-1.5 rounded-lg border border-gray-700 hover:border-red-600 transition duration-300 group cursor-default">
                  <span className="text-base font-semibold text-white group-hover:text-red-400 transition duration-300">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={onSettingsClick}
                  className="text-gray-400 hover:text-white p-2.5 rounded-lg border border-transparent hover:border-gray-700 transition duration-300 flex items-center justify-center hover:bg-gray-900/50"
                  title="Settings"
                >
                  <Settings size={20} />
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white p-2.5 rounded-lg border border-transparent hover:border-gray-700 transition duration-300 flex items-center justify-center hover:bg-gray-900/50"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg transition duration-300"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* Mobile Menu */}
      {!isPublicPage && user && mobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 p-4 space-y-3">
          {navLinks.map((link) => (
            <Link 
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition duration-300"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link 
              to="/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-yellow-300 hover:text-yellow-400 hover:bg-gray-900 rounded-lg transition duration-300 flex items-center gap-2"
            >
              <Lock size={16} />
              Dashboard
            </Link>
          )}
          <hr className="border-gray-700 my-2" />
          <div className="px-4 py-2.5">
            <p className="text-sm text-gray-500 mb-3">User: {user.name}</p>
            <div className="flex gap-2">
              <button
                onClick={onSettingsClick}
                className="flex-1 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                <Settings size={18} />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-3 py-2 text-gray-300 hover:text-white hover:bg-red-900/30 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
