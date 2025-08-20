import React, { useState } from 'react';
import { Save, Eye, EyeOff, Palette, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext.jsx';

const Settings = () => {
  const { theme, mode, setTheme, setMode, themes, currentColors } = useTheme();
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const togglePasswordVisibility = (field) => setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) return alert('New passwords do not match!');
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsSaving(false);
  };

  return (
    <div>
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: currentColors.text }}>Settings</h1>
        <p style={{ color: currentColors.textSecondary }}>Manage your account settings and preferences.</p>
      </motion.div>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-lg shadow-sm border" style={{ backgroundColor: currentColors.surface, borderColor: currentColors.border }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: currentColors.border }}><h2 className="text-lg font-semibold flex items-center" style={{ color: currentColors.text }}><Palette className="w-5 h-5 mr-3" />Appearance</h2></div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: currentColors.textSecondary }}>Color Mode</label>
              <div className="relative flex items-center w-40 h-10 rounded-full p-1" style={{ backgroundColor: currentColors.background }}>
                <motion.div className="absolute h-8 w-1/2 rounded-full" style={{ backgroundColor: currentColors.primary }} animate={{ x: mode === 'light' ? 4 : 72 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                <button onClick={() => setMode('light')} className="relative z-10 w-1/2 flex justify-center items-center h-full"><Sun className={`w-5 h-5 transition-colors ${mode === 'light' ? 'text-white' : 'text-gray-400'}`} /></button>
                <button onClick={() => setMode('dark')} className="relative z-10 w-1/2 flex justify-center items-center h-full"><Moon className={`w-5 h-5 transition-colors ${mode === 'dark' ? 'text-white' : 'text-gray-400'}`} /></button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block" style={{ color: currentColors.textSecondary }}>Accent Color</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.values(themes).map(t => (
                  <motion.div key={t.id} onClick={() => setTheme(t.id)} className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${theme.id === t.id ? 'ring-2 ring-offset-2' : ''}`} style={{ borderColor: theme.id === t.id ? t.light.primary : currentColors.border, ringColor: t.light.primary, ringOffsetColor: currentColors.surface }}>
                    <div className="flex items-center space-x-3"><div className="w-8 h-8 rounded-full" style={{ backgroundColor: t.light.primary }}></div><h3>{t.name}</h3></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-lg shadow-sm border" style={{ backgroundColor: currentColors.surface, borderColor: currentColors.border }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: currentColors.border }}><h2 className="text-lg font-semibold" style={{ color: currentColors.text }}>Change Password</h2></div>
          <form onSubmit={handlePasswordSubmit} className="p-6">
            <div className="space-y-6">
              <div><label className="block text-sm font-medium mb-2" style={{ color: currentColors.textSecondary }}>Current Password</label><div className="relative"><input type={showPasswords.current ? 'text' : 'password'} name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2" style={{backgroundColor: currentColors.background, borderColor: currentColors.border, color: currentColors.text, '--tw-ring-color': currentColors.primary}} required /><button type="button" onClick={() => togglePasswordVisibility('current')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">{showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium mb-2" style={{ color: currentColors.textSecondary }}>New Password</label><div className="relative"><input type={showPasswords.new ? 'text' : 'password'} name="newPassword" value={formData.newPassword} onChange={handleInputChange} className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2" style={{backgroundColor: currentColors.background, borderColor: currentColors.border, color: currentColors.text, '--tw-ring-color': currentColors.primary}} required /><button type="button" onClick={() => togglePasswordVisibility('new')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">{showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
                <div><label className="block text-sm font-medium mb-2" style={{ color: currentColors.textSecondary }}>Confirm New Password</label><div className="relative"><input type={showPasswords.confirm ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2" style={{backgroundColor: currentColors.background, borderColor: currentColors.border, color: currentColors.text, '--tw-ring-color': currentColors.primary}} required /><button type="button" onClick={() => togglePasswordVisibility('confirm')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">{showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
              </div>
            </div>
            <div className="mt-6"><button type="submit" disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmPassword || isSaving} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 disabled:opacity-50 transition-colors" style={{ backgroundColor: currentColors.primary }}><Save className="w-4 h-4 mr-2" />{isSaving ? 'Updating...' : 'Update Password'}</button></div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
