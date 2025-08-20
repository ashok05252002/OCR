import React, { useState, useEffect, useRef } from 'react';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { Link } from 'react-router-dom';

const TopBar = ({ onProfileClick }) => {
  const { user, logout } = useAuth();
  const { currentColors, mode } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    onProfileClick();
    setIsProfileOpen(false);
  };

  return (
    <div 
      className="h-16 shadow-sm sticky top-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: currentColors.surface, borderColor: currentColors.border }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link to="/" className="flex items-center">
            <img 
              src="https://www.iproat.com/wp-content/uploads/2025/01/cropped-iProAT-Solutions-Black-300x100.png" 
              alt="iProAT Solutions Logo"
              className={`h-8 w-auto ${mode === 'dark' ? 'bg-white p-1 rounded' : ''}`}
            />
          </Link>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <img
                className="h-9 w-9 rounded-full ring-2 ring-offset-2"
                style={{ ringColor: currentColors.primary, ringOffsetColor: currentColors.surface }}
                src={user?.avatar}
                alt={user?.name}
              />
            </button>
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg py-2 origin-top-right"
                  style={{ backgroundColor: currentColors.surface, border: `1px solid ${currentColors.border}`}}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: currentColors.border }}>
                    <p className="text-sm font-semibold" style={{ color: currentColors.text }}>{user?.name}</p>
                    <p className="text-sm truncate" style={{ color: currentColors.textSecondary }}>{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <button onClick={handleProfileClick} className="flex items-center w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-slate-700" style={{ color: currentColors.textSecondary}}>
                      <UserIcon className="w-4 h-4 mr-3" />Profile
                    </button>
                    <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-slate-700" style={{ color: currentColors.textSecondary}}>
                      <Settings className="w-4 h-4 mr-3" />Settings
                    </Link>
                    <button onClick={logout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <LogOut className="w-4 h-4 mr-3" />Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
