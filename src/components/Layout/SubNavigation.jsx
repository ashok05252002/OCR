import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckCircle, Clock, Users, Settings } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const SubNavigation = () => {
  const { currentColors } = useTheme();
  
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/approve', icon: CheckCircle, label: 'Approve Requests' },
    { to: '/history', icon: Clock, label: 'History' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="border-b shadow-sm" style={{ backgroundColor: currentColors.surface, borderBottomColor: currentColors.border }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `inline-flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 mr-4 ${
                  isActive
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                    : 'border-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`
              }
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubNavigation;
