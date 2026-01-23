import React from 'react';

export const Header = ({ title, subtitle }) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
      </div>
    </div>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">TOP SPEED</h3>
            <p className="text-gray-400 text-sm">Premium automotive platform</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/cars" className="hover:text-white transition">
                  Cars
                </a>
              </li>
              <li>
                <a href="/recommendations" className="hover:text-white transition">
                  Recommendations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/configurator" className="hover:text-white transition">
                  Configurator
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-white transition">
                  Admin
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Info</h4>
            <p className="text-gray-400 text-sm">
              Contact: support@topspeed.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500 text-sm">
            Developed by Programmer Bilal Mohamed
          </p>
          <p className="text-center text-gray-600 text-xs mt-2">
            Copyright {currentYear} TOP SPEED. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
