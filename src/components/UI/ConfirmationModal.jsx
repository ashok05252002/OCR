import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger' }) => {
  const { currentColors } = useTheme();
  const variantClasses = {
    danger: { iconBg: 'bg-red-100 dark:bg-red-900/50', iconText: 'text-red-600 dark:text-red-400', confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500' },
    warning: { iconBg: 'bg-yellow-100 dark:bg-yellow-900/50', iconText: 'text-yellow-600 dark:text-yellow-400', confirmButton: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400' },
    info: { iconBg: 'bg-blue-100 dark:bg-blue-900/50', iconText: 'text-blue-600 dark:text-blue-400', confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' },
  };
  const classes = variantClasses[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black bg-opacity-60" />
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} className="relative rounded-lg shadow-xl w-full max-w-md" style={{ backgroundColor: currentColors.surface }}>
              <div className="p-6">
                <div className="flex">
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${classes.iconBg}`}><AlertTriangle className={`h-6 w-6 ${classes.iconText}`} /></div>
                  <div className="ml-4 text-left">
                    <h3 className="text-lg font-semibold" style={{ color: currentColors.text }}>{title}</h3>
                    <div className="mt-2"><p className="text-sm" style={{ color: currentColors.textSecondary }}>{message}</p></div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 flex justify-end space-x-3" style={{ backgroundColor: currentColors.background, borderTop: `1px solid ${currentColors.border}`}}>
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-md transition-colors" style={{ backgroundColor: currentColors.surface, color: currentColors.text, border: `1px solid ${currentColors.border}` }}>{cancelText}</button>
                <button type="button" onClick={onConfirm} className={`px-4 py-2 text-sm font-medium rounded-md text-white transition-colors ${classes.confirmButton}`}>{confirmText}</button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
