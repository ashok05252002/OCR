import React, { useState } from 'react';
import TopBar from './TopBar.jsx';
import SubNavigation from './SubNavigation.jsx';
import ProfilePanel from '../Profile/ProfilePanel.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const Layout = ({ children }) => {
  const { currentColors } = useTheme();
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: currentColors.background }}
    >
      <div className="sticky top-0 z-40">
        <TopBar onProfileClick={() => setIsProfilePanelOpen(true)} />
        <SubNavigation />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <ProfilePanel isOpen={isProfilePanelOpen} onClose={() => setIsProfilePanelOpen(false)} />
    </div>
  );
};

export default Layout;
