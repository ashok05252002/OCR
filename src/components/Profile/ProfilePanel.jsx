import React from 'react';
import SidePanel from '../UI/SidePanel.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { Mail, Phone, User as UserIcon } from 'lucide-react';

const ProfilePanel = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { currentColors } = useTheme();

  if (!user) return null;

  return (
    <SidePanel isOpen={isOpen} onClose={onClose} title="My Profile">
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full ring-4" style={{ ringColor: currentColors.primary }} />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: currentColors.text }}>{user.name}</h2>
        <p className="text-sm" style={{ color: currentColors.textSecondary }}>Administrator</p>
        <div className="w-full mt-8 space-y-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: currentColors.background }}>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-4" style={{ color: currentColors.textSecondary }} />
              <div>
                <p className="text-xs" style={{ color: currentColors.textSecondary }}>Email</p>
                <p className="font-medium" style={{ color: currentColors.text }}>{user.email}</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: currentColors.background }}>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-4" style={{ color: currentColors.textSecondary }} />
              <div>
                <p className="text-xs" style={{ color: currentColors.textSecondary }}>Phone</p>
                <p className="font-medium" style={{ color: currentColors.text }}>{user.phoneNumber || 'Not provided'}</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: currentColors.background }}>
            <div className="flex items-center">
              <UserIcon className="w-5 h-5 mr-4" style={{ color: currentColors.textSecondary }} />
              <div>
                <p className="text-xs" style={{ color: currentColors.textSecondary }}>Role</p>
                <p className="font-medium" style={{ color: currentColors.text }}>Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidePanel>
  );
};

export default ProfilePanel;
