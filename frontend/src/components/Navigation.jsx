import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TS</span>
          </div>
          <span className="text-white font-bold text-xl hidden sm:inline">TOP SPEED</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/cars" className="text-gray-300 hover:text-white transition">
            Cars
          </Link>
          <Link to="/recommendations" className="text-gray-300 hover:text-white transition">
            Recommendations
          </Link>
          <Link to="/configurator" className="text-gray-300 hover:text-white transition">
            Configurator
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Settings size={18} />
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300 text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition flex items-center gap-2"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Admin
            </Link>
          )}

          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-gray-900 border-t border-gray-800"
        >
          <div className="flex flex-col gap-4 p-4">
            <Link to="/cars" className="text-gray-300 hover:text-white transition">
              Cars
            </Link>
            <Link to="/recommendations" className="text-gray-300 hover:text-white transition">
              Recommendations
            </Link>
            <Link to="/configurator" className="text-gray-300 hover:text-white transition">
              Configurator
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-300 hover:text-white transition">
                Admin
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};
