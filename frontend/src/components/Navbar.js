import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/profile" className="text-2xl font-bold">
            Dashboard
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              to="/profile"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/profile') ? 'font-semibold' : ''
              }`}
            >
              Profile
            </Link>
            <Link
              to="/topics"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/topics') ? 'font-semibold' : ''
              }`}
            >
              Topics
            </Link>
            <Link
              to="/progress"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/progress') ? 'font-semibold' : ''
              }`}
            >
              Progress
            </Link>
            <button
              onClick={logout}
              className="px-4 py-1 border border-white rounded hover:bg-white hover:text-blue-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
