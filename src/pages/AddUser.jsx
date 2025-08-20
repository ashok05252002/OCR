import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../components/UI/Modal.jsx';
import ConfirmationModal from '../components/UI/ConfirmationModal.jsx';
import { mockUsers } from '../data/mockData.js';
import { useTheme } from '../contexts/ThemeContext.jsx';

const initialFormData = { name: '', email: '', password: '', role: 'Employee', permissions: [] };

const AddUser = () => {
  const { currentColors } = useTheme();
  const [users, setUsers] = useState(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isModalOpen && editingUser) {
      setFormData({ name: editingUser.name, email: editingUser.email, password: '', role: editingUser.role, permissions: editingUser.permissions });
    } else {
      setFormData(initialFormData);
    }
  }, [isModalOpen, editingUser]);

  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };
  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handlePermissionChange = (permission, checked) => setFormData(prev => ({ ...prev, permissions: checked ? [...prev.permissions, permission] : prev.permissions.filter(p => p !== permission) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...formData, password: '' } : u));
    } else {
      setUsers([...users, { id: Date.now().toString(), ...formData, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}` }]);
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (!deletingUser) return;
    setUsers(users.filter(user => user.id !== deletingUser.id));
    setDeletingUser(null);
  };

  return (
    <div>
      <motion.div className="mb-8 flex justify-between items-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: currentColors.text }}>User Management</h1>
          <p style={{ color: currentColors.textSecondary }}>Add, edit, and manage system users and their permissions.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 transition-colors" style={{ backgroundColor: currentColors.primary }}><Plus className="w-4 h-4 mr-2" />Add User</button>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-lg shadow-sm border" style={{ backgroundColor: currentColors.surface, borderColor: currentColors.border }}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead style={{ backgroundColor: currentColors.background }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>User</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: currentColors.textSecondary }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: currentColors.border }}>
              {users.map((user, index) => (
                <motion.tr key={user.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} /><div className="ml-4"><div className="text-sm font-medium" style={{ color: currentColors.text }}>{user.name}</div><div className="text-sm" style={{ color: currentColors.textSecondary }}>{user.email}</div></div></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: currentColors.secondary, color: currentColors.primary }}>{user.role}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex flex-wrap gap-1">{user.permissions.map(p => <span key={p} className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300">{p}</span>)}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><div className="flex space-x-2"><button onClick={() => handleOpenModal(user)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700"><Edit2 className="w-4 h-4" style={{ color: currentColors.textSecondary }} /></button><button onClick={() => setDeletingUser(user)} className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50"><Trash2 className="w-4 h-4 text-red-500" /></button></div></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingUser ? 'Edit User' : 'Add New User'}>
        <form onSubmit={handleSubmit} className="p-2">
          <div className="grid md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium mb-2" style={{ color: currentColors.textSecondary }}>Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors" style={{ backgroundColor: currentColors.background, borderColor: currentColors.border, color: currentColors.text, '--tw-ring-color': currentColors.primary }} /></div>
            <div><label className="block text-sm font-medium mb-2" style={{ color: currentColors.textSecondary }}>Email</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors" style={{ backgroundColor: currentColors.background, borderColor: currentColors.border, color: currentColors.text, '--tw-ring-color': currentColors.primary }} /></div>
            {!editingUser && <div><label className="block text-sm font-medium mb-2" style={{ color: currentColors.textSecondary }}>Password</label><input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors" style={{ backgroundColor: currentColors.background, borderColor: currentColors.border, color: currentColors.text, '--tw-ring-color': currentColors.primary }} /></div>}
            <div><label className="block text-sm font-medium mb-2" style={{ color: currentColors.textSecondary }}>Role</label><select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors" style={{ backgroundColor: currentColors.background, borderColor: currentColors.border, color: currentColors.text, '--tw-ring-color': currentColors.primary }}><option>Employee</option><option>Manager</option><option>Admin</option></select></div>
          </div>
          <div className="mt-6"><label className="block text-sm font-medium mb-3" style={{ color: currentColors.textSecondary }}>Permissions</label><div className="space-y-3">{['Dashboard', 'Approve', 'History'].map(p => <div key={p} className="flex items-center"><input type="checkbox" id={`perm-${p}`} checked={formData.permissions.includes(p)} onChange={e => handlePermissionChange(p, e.target.checked)} className="h-4 w-4 border-gray-300 rounded" style={{ accentColor: currentColors.primary }} /><label htmlFor={`perm-${p}`} className="ml-3 text-sm" style={{ color: currentColors.textSecondary }}>Access to {p}</label></div>)}</div></div>
          <div className="mt-8 flex justify-end space-x-3"><button type="button" onClick={handleCloseModal} className="px-4 py-2 border rounded-md text-sm font-medium" style={{ borderColor: currentColors.border, color: currentColors.text }}>Cancel</button><button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white" style={{ backgroundColor: currentColors.primary }}><Save className="w-4 h-4 mr-2 inline" />{editingUser ? 'Update User' : 'Add User'}</button></div>
        </form>
      </Modal>
      <ConfirmationModal isOpen={!!deletingUser} onClose={() => setDeletingUser(null)} onConfirm={handleDelete} title="Delete User" message={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`} confirmText="Delete" variant="danger" />
    </div>
  );
};

export default AddUser;
